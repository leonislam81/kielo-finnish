(() => {
  const SITE_API = "https://kielo-finnish.openmoss1.chatgpt.site";
  const VOICE_CACHE_LIMIT = 40;
  const LOCAL_SPEECH_URL = "./supertonic-speech.js?v=8";
  const audioCache = new Map();
  const decodedLocalAudio = new WeakMap();
  const decodedLocalBuffers = new Map();
  let statusCache = null;
  let statusExpiresAt = 0;
  let statusRequest = null;
  let activeAudio = null;
  let activeFinish = null;
  let activeSource = null;
  let activeUtterance = null;
  let audioContext = null;
  let localSpeechModule = null;
  let localPreparation = null;
  let warmupStarted = false;
  let speechObserver = null;
  let speechContentObserver = null;
  let scanTimer = 0;
  let queuedPreloads = 0;
  let installedSpeechVoices = [];
  // Keep only a tiny audio queue ahead of the learner. A long queue competes
  // with a newly requested phrase and makes the first tap feel unresponsive.
  const MAX_BACKGROUND_PRELOADS = 8;
  let playbackId = 0;
  let lastPlaybackMode = "selected";

  function selectedLocalStyle() {
    const voice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    if (voice.startsWith("local:")) return /^[FM][1-5]$/.test(voice.slice(6)) ? voice.slice(6) : "F1";
    return "";
  }

  function synthesisSpeed(rate) {
    return rate < 0.78 ? 1.28 : rate > 0.93 ? 0.96 : 1.08;
  }

function localAudioKey(text, style, speed) {
  return `${style}\u0000${speed}\u0000${String(text).trim()}`;
}

  function deviceVoices() {
    if (!("speechSynthesis" in window)) return installedSpeechVoices;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) installedSpeechVoices = voices;
    return voices.length ? voices : installedSpeechVoices;
  }

  function localSpeech() {
    localSpeechModule ||= import(LOCAL_SPEECH_URL).catch((error) => {
      localSpeechModule = null;
      throw error;
    });
    return localSpeechModule;
  }

  function isDataSaver() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection?.saveData === true || ["slow-2g", "2g"].includes(connection?.effectiveType);
  }

  function speechTextForButton(button) {
    if (button.hasAttribute("data-speak")) return button.dataset.speak;
    if (button.hasAttribute("data-topic-speak")) return button.dataset.topicSpeak;
    if (button.hasAttribute("data-dictionary-speak")) return button.dataset.dictionarySpeak;
    return "";
  }

  function speechRateForButton(button) {
    if (button.dataset.speakRate) return Number(button.dataset.speakRate) || 0.78;
    if (button.hasAttribute("data-speak")) return 0.78;
    return Number(localStorage.getItem("kielo-finnish-rate") || "0.86");
  }

  function scheduleVisiblePreload(button) {
    const text = speechTextForButton(button)?.trim();
    const style = selectedLocalStyle();
    if (!text || !style || !button.isConnected || !window.KieloSpeech) return;
    const speed = synthesisSpeed(speechRateForButton(button));
    const key = `${style}\u0000${speed}\u0000${text}`;
    if (button.dataset.kieloPreloadKey === key || queuedPreloads >= MAX_BACKGROUND_PRELOADS) return;
    button.dataset.kieloPreloadKey = key;
    queuedPreloads += 1;
    localSpeech().then(async (speech) => {
      await speech.preload(text, style, speed);
      if (speech.hasAudio(text, style, speed)) {
        const blob = await speech.synthesize(text, style, speed);
        void decodeLocalAudio(blob, key).catch(() => {});
      } else if (button.dataset.kieloPreloadKey === key) delete button.dataset.kieloPreloadKey;
    }).catch(() => {
      if (button.dataset.kieloPreloadKey === key) delete button.dataset.kieloPreloadKey;
    }).finally(() => {
      queuedPreloads = Math.max(0, queuedPreloads - 1);
      if (document.visibilityState !== "hidden") observeVisibleSpeech();
    });
  }

  function observeVisibleSpeech() {
    const content = document.getElementById("page-content");
    if (!content || !selectedLocalStyle()) return;
    const selector = "[data-speak],[data-topic-speak],[data-dictionary-speak]";
    if (speechObserver) speechObserver.disconnect();
    if ("IntersectionObserver" in window) {
      speechObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            speechObserver.unobserve(entry.target);
            scheduleVisiblePreload(entry.target);
          }
        }
      }, { rootMargin: "240px 0px" });
      content.querySelectorAll(selector).forEach((button) => speechObserver.observe(button));
    } else {
      content.querySelectorAll(selector).forEach((button) => {
        const rect = button.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top < window.innerHeight + 240) scheduleVisiblePreload(button);
      });
    }
  }

  function startBackgroundWarmup() {
    if (warmupStarted || !selectedLocalStyle() || isDataSaver() || document.visibilityState === "hidden") return;
    warmupStarted = true;
    const style = selectedLocalStyle();
    document.dispatchEvent(new CustomEvent("kielo-speech-preparation", { detail: { phase: "starting" } }));
    localPreparation = localSpeech().then((speech) => speech.prepare(style, (progress) => {
      document.dispatchEvent(new CustomEvent("kielo-speech-preparation", { detail: progress }));
    })).then(() => {
      document.dispatchEvent(new CustomEvent("kielo-speech-preparation", { detail: { phase: "ready" } }));
      if (selectedLocalStyle()) observeVisibleSpeech();
    }).catch(() => {
      warmupStarted = false;
      document.dispatchEvent(new CustomEvent("kielo-speech-preparation", { detail: { phase: "failed" } }));
    }).finally(() => {
      localPreparation = null;
    });
  }

  function scheduleBackgroundWarmup() {
    if (!selectedLocalStyle() || isDataSaver()) return;
  // Start fetching the voice as soon as the page is ready, while the learner
  // is reading. Waiting for an idle callback meant a quick first tap could be
  // the event that began the large model download.
  startBackgroundWarmup();
  }

  function apiBase() {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" ? window.location.origin : SITE_API;
  }

  async function getStatus(force = false) {
    if (!force && statusCache && Date.now() < statusExpiresAt) return statusCache;
    if (statusRequest) return statusRequest;
    statusRequest = fetch(`${apiBase()}/api/speech/status`, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    }).then(async (response) => {
      if (!response.ok) throw new Error("Speech service unavailable");
      const result = await response.json();
      statusCache = {
        enabled: result.enabled === true,
        dailyCharacterCap: Number(result.dailyCharacterCap) || 0,
        provider: typeof result.provider === "string" ? result.provider : null,
        voices: Array.isArray(result.voices) ? result.voices : [],
      };
      statusExpiresAt = Date.now() + 60_000;
      return statusCache;
    }).catch(() => {
      statusCache = { enabled: false, dailyCharacterCap: 0, provider: null, voices: [] };
      statusExpiresAt = Date.now() + 15_000;
      return statusCache;
    }).finally(() => {
      statusRequest = null;
    });
    return statusRequest;
  }

  function showMessage(message, persistent = false) {
    const toast = document.getElementById("toast");
    document.dispatchEvent(new CustomEvent("kielo-speech-status", { detail: { message, persistent } }));
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toast.kieloTimer);
    if (!persistent) toast.kieloTimer = window.setTimeout(() => toast.classList.remove("visible"), 3_200);
  }

  function clearMessage() {
    const toast = document.getElementById("toast");
    document.dispatchEvent(new CustomEvent("kielo-speech-status", { detail: { message: "", persistent: false } }));
    if (!toast) return;
    window.clearTimeout(toast.kieloTimer);
    toast.classList.remove("visible");
  }

  function prepareAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      audioContext ||= new AudioContextClass();
      if (audioContext.state === "suspended") void audioContext.resume().catch(() => {});
      return audioContext;
    } catch {
      return null;
    }
  }

  function decodeLocalAudio(blob, cacheKey = "") {
    const context = prepareAudioContext();
    if (!context || !blob) return Promise.reject(new Error("Audio decoding is unavailable."));
    let decoded = decodedLocalAudio.get(blob);
    if (!decoded) {
      decoded = blob.arrayBuffer().then((buffer) => context.decodeAudioData(buffer));
      decodedLocalAudio.set(blob, decoded);
      decoded.catch(() => decodedLocalAudio.delete(blob));
    }
    if (cacheKey) {
      void decoded.then((audioBuffer) => {
        decodedLocalBuffers.set(cacheKey, audioBuffer);
        while (decodedLocalBuffers.size > VOICE_CACHE_LIMIT) decodedLocalBuffers.delete(decodedLocalBuffers.keys().next().value);
      }).catch(() => {});
    }
    return decoded;
  }

  function playbackStarted() {
    showMessage("Playing Finnish voice…", true);
  }

  function stop() {
    const speechSynthesis = window.speechSynthesis;
    const cancelSpeech = Boolean(speechSynthesis && (activeUtterance || speechSynthesis.speaking || speechSynthesis.pending));
    playbackId += 1;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.removeAttribute("src");
      activeAudio.load();
      activeAudio = null;
    }
    if (activeSource) {
      try { activeSource.stop(); } catch {}
      activeSource = null;
    }
    if (activeFinish) {
      const finish = activeFinish;
      activeFinish = null;
      finish(false);
    }
    // Calling cancel() when speech is already idle can reset Chromium's speech
    // service just before the next utterance is submitted. Leave an idle
    // service alone so a fresh tap can start in the same click task.
    if (cancelSpeech) speechSynthesis.cancel();
    clearMessage();
    return cancelSpeech;
  }

  function paceName(rate) {
    if (rate < 0.78) return "slow";
    if (rate > 0.93) return "natural";
    return "steady";
  }

  async function requestNeuralAudio(text, voice, pace) {
    const cacheKey = `${voice}\u0000${pace}\u0000${text}`;
    if (audioCache.has(cacheKey)) return audioCache.get(cacheKey);
    const response = await fetch(`${apiBase()}/api/speech/synthesize`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice, pace }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      if (response.status === 429) showMessage("The site’s Finnish neural-voice limit is reached for today. Using the device voice instead.");
      throw new Error("Natural Finnish audio is temporarily unavailable.");
    }
    const audio = await response.blob();
    audioCache.set(cacheKey, audio);
    while (audioCache.size > VOICE_CACHE_LIMIT) audioCache.delete(audioCache.keys().next().value);
    return audio;
  }

  function playAudio(blob, currentPlaybackId) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      activeAudio = audio;
      let settled = false;
      const finish = (played) => {
        if (settled) return;
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        URL.revokeObjectURL(url);
        if (activeAudio === audio) activeAudio = null;
        if (activeFinish === finish) activeFinish = null;
        resolve(played);
      };
      activeFinish = finish;
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      if (currentPlaybackId !== playbackId) {
        finish(false);
        return;
      }
      Promise.resolve(audio.play()).then(() => {
        if (currentPlaybackId === playbackId) playbackStarted();
      }).catch(() => finish(false));
    });
  }

  function playLocalBuffer(audioBuffer, currentPlaybackId) {
    const context = prepareAudioContext();
    if (!context || !audioBuffer) return Promise.resolve(false);
    return new Promise((resolve) => {
      let settled = false;
      let source = null;
      const finish = (played) => {
        if (settled) return;
        settled = true;
        if (activeSource === source) activeSource = null;
        if (activeFinish === finish) activeFinish = null;
        resolve(played);
      };
      activeFinish = finish;
      const start = () => {
        try {
          if (currentPlaybackId !== playbackId) return finish(false);
          source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(context.destination);
          activeSource = source;
          source.onended = () => finish(currentPlaybackId === playbackId);
          source.start(0);
          playbackStarted();
        } catch {
          finish(false);
        }
      };
      if (context.state === "suspended") void context.resume().then(start, () => finish(false));
      else start();
    });
  }

  function playLocalAudio(blob, currentPlaybackId, cacheKey = "") {
    const context = prepareAudioContext();
    if (!context) return playAudio(blob, currentPlaybackId);
    const cachedBuffer = cacheKey && decodedLocalBuffers.get(cacheKey);
    if (cachedBuffer) return playLocalBuffer(cachedBuffer, currentPlaybackId);
    return decodeLocalAudio(blob, cacheKey).then((audioBuffer) => playLocalBuffer(audioBuffer, currentPlaybackId)).catch(() => false);
  }

  function speakOnDevice(text, rate, currentPlaybackId, quietIfMissing = false, afterCancel = false) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      showMessage("Audio playback is not available in this browser.");
      return Promise.resolve(false);
    }
    // getVoices() is empty in some browsers until their voice service wakes
    // up. Still submit the utterance so the browser can use its default voice
    // immediately while the selected on-device Finnish voice prepares.
    const voices = deviceVoices();
    const finnish = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("fi"));
    const selectedName = localStorage.getItem("kielo-finnish-voice") || "";
    const neuralVoice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const preferMale = /:M[1-5]$|charon|harri/i.test(neuralVoice);
    const genderMatch = voices.find((voice) => {
      const name = String(voice.name || "").toLowerCase();
      const looksFemale = /female|woman|zira|samantha|victoria|karen|tessa|moira|fiona|heidi|selma|noora|jenny|aria|ava|emma|salli|joanna|kendra|michelle|linda|susan/.test(name);
      const looksMale = /(^|[^a-z])(male|man)([^a-z]|$)|\b(alex|daniel|fred|david|mark|george|james|harri|mikko|liam|guy|ryan|matthew|joey|justin|john|bruce|aaron|arthur|oliver)\b/.test(name);
      return preferMale ? looksMale : looksFemale;
    });
    const selected = voices.find((voice) => voice.name === selectedName) || finnish[0] || genderMatch || voices.find((voice) => voice.default) || voices[0];
    const utterance = new SpeechSynthesisUtterance(text);
    // Keep Finnish as the requested language even if the quick preview has to
    // borrow an installed system voice with another language tag.
    // If the device has no Finnish voice, request the selected device voice's
    // own language for the immediate preview. Some speech services delay or
    // drop a Finnish-tagged utterance when no Finnish voice is installed.
    utterance.lang = finnish.length ? "fi-FI" : selected?.lang || voices.find((voice) => voice.default)?.lang || voices[0]?.lang || navigator.language || "en-US";
    utterance.rate = rate;
    if (selected) utterance.voice = selected;
    return new Promise((resolve) => {
      let settled = false;
      const finish = (played) => {
        if (settled) return;
        settled = true;
        if (activeUtterance === utterance) activeUtterance = null;
        if (activeFinish === finish) activeFinish = null;
        resolve(played);
      };
      activeFinish = finish;
      activeUtterance = utterance;
      utterance.onstart = () => {
        if (currentPlaybackId === playbackId) showMessage("Playing an immediate device preview…", true);
      };
      utterance.onend = () => finish(true);
      utterance.onerror = (event) => {
        if (!quietIfMissing && event?.error !== "canceled" && event?.error !== "interrupted") {
          showMessage("This device could not play that voice. Choose another device voice in Voice & audio settings.");
        }
        finish(false);
      };
      if (currentPlaybackId !== playbackId) {
        finish(false);
        return;
      }
      const begin = () => {
        if (currentPlaybackId !== playbackId) return finish(false);
        window.speechSynthesis.speak(utterance);
      };
      // Chromium can briefly keep the cancelled utterance in its queue. A
      // zero-delay reset is only needed to interrupt active speech; idle taps
      // submit the preview immediately without this extra turn.
      if (afterCancel) window.setTimeout(begin, 0);
      else begin();
    });
  }

  async function speak(text, rate = 0.86) {
    if (typeof text !== "string" || !text.trim()) return false;
    const phrase = text.trim();
    const interruptedSpeech = stop();
    lastPlaybackMode = "selected";
    const currentPlaybackId = playbackId;
    const normalizedRate = Math.min(1.15, Math.max(0.6, Number(rate) || 0.86));
    const voice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const style = voice.startsWith("local:") ? voice.slice(6) : localStorage.getItem("kielo-supertonic-style") || "F1";
    const speed = synthesisSpeed(normalizedRate);
    const localKey = localAudioKey(phrase, style, speed);
    const neuralCacheKey = `${voice}\u0000${paceName(normalizedRate)}\u0000${phrase}`;

    // Repeated taps on a prepared phrase start from its decoded buffer without
    // waiting for model setup, audio decoding, or a network request.
    const preparedBuffer = voice.startsWith("local:") && decodedLocalBuffers.get(localKey);
    if (preparedBuffer) return playLocalBuffer(preparedBuffer, currentPlaybackId);
    if (!voice.startsWith("local:") && voice !== "device" && audioCache.has(neuralCacheKey)) {
      return playAudio(audioCache.get(neuralCacheKey), currentPlaybackId);
    }

    // Start the installed male/female device voice inside the click gesture,
    // before any module import, model work, or API request can delay playback.
    prepareAudioContext();
    const canTryDevicePreview = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    const instantPreview = canTryDevicePreview
      ? speakOnDevice(phrase, normalizedRate, currentPlaybackId, true, interruptedSpeech)
      : null;
    if (instantPreview) {
      lastPlaybackMode = "device-preview";
      showMessage("Starting an immediate browser preview while your selected Finnish voice prepares.", true);
    }

    const localFallback = async () => {
      if (currentPlaybackId !== playbackId) return false;
      let previewPlayed = false;
      try {
        const speechApi = await localSpeech();
        if (currentPlaybackId !== playbackId) return false;
        const audioPromise = speechApi.synthesize(phrase, style, speed, (progress) => {
          if (currentPlaybackId !== playbackId || instantPreview) return;
          if (progress.phase === "loading") {
            const stage = progress.current ? ` · model ${progress.current} of ${progress.total}` : "";
            showMessage(`Preparing the free Finnish voice${stage}. First use downloads about 140 MB; text stays on this device.`, true);
          } else {
            showMessage(`Generating Finnish speech · ${progress.current} of ${progress.total}`, true);
          }
        });
        if (instantPreview) previewPlayed = await instantPreview;
        if (previewPlayed && currentPlaybackId === playbackId) {
          // Finish preparing this phrase silently; the next tap can play the
          // selected Finnish voice from its decoded audio buffer immediately.
          void audioPromise.then((blob) => decodeLocalAudio(blob, localKey)).then(() => {
            if (currentPlaybackId === playbackId) showMessage("Your selected Finnish voice is ready for instant replay.");
          }).catch(() => {
            if (currentPlaybackId === playbackId) showMessage("The instant preview played. The selected Finnish voice is still preparing.");
          });
          return true;
        }
        if (!instantPreview) {
          const modelReady = speechApi.isReady();
          showMessage(modelReady
            ? "Creating Finnish speech on this device…"
            : "Preparing the free Finnish voice model. First setup downloads about 140 MB; text stays on this device.", true);
        }
        const blob = await audioPromise;
        if (currentPlaybackId !== playbackId) return false;
        const played = await playLocalAudio(blob, currentPlaybackId, localKey);
        clearMessage();
        if (!played && currentPlaybackId === playbackId) showMessage("The Finnish voice is ready. Tap again if this browser blocked audio playback.");
        return played;
      } catch (error) {
        if (currentPlaybackId !== playbackId) return false;
        localSpeechModule = null;
        clearMessage();
        if (instantPreview) {
          previewPlayed = previewPlayed || await instantPreview;
          if (previewPlayed) {
            showMessage("The word played immediately. The selected Finnish voice could not finish preparing.");
            return true;
          }
        }
        const detail = String(error?.message || "").toLowerCase();
        const failureMessage = /memory|allocation|out of memory|oom/.test(detail)
          ? "This device ran short of browser memory while preparing the free Finnish voice. Close unused tabs and try again."
          : /fetch|network|cors|load failed|timeout|failed to load/.test(detail)
            ? "The free Finnish voice download was interrupted. Reconnect and tap Preview again; your text stays on this device."
            : "The free Finnish voice could not finish setup. Check your connection and browser memory, then tap Preview again.";
        const hasFinnishDeviceVoice = deviceVoices().some((item) => item.lang?.toLowerCase().startsWith("fi"));
        if (hasFinnishDeviceVoice && !instantPreview && await speakOnDevice(phrase, normalizedRate, currentPlaybackId)) {
          clearMessage();
          return true;
        }
        showMessage(failureMessage);
        return false;
      }
    };

    if (voice.startsWith("local:")) return localFallback();
    if (voice === "device") return instantPreview || localFallback();

    // Remote voice setup can take a network round trip. Keep that work in the
    // background after the device preview so it never delays the first sound.
    if (instantPreview) {
      void getStatus().then((status) => status.enabled ? requestNeuralAudio(phrase, voice, paceName(normalizedRate)) : null).catch(() => {});
      return instantPreview;
    }
    const status = await getStatus();
    if (currentPlaybackId !== playbackId) return false;
    if (status.enabled) {
      try {
        const blob = await requestNeuralAudio(phrase, voice, paceName(normalizedRate));
        if (currentPlaybackId !== playbackId) return false;
        if (await playAudio(blob, currentPlaybackId)) return true;
      } catch {
        if (currentPlaybackId !== playbackId) return false;
      }
    }
    return localFallback();
  }

  function localVoiceStatus() {
    return localSpeechModule ? localSpeechModule.then((speech) => ({
      modelReady: speech.isReady(),
      preparing: speech.isPreparing?.() === true || Boolean(localPreparation),
      dataSaver: isDataSaver(),
    })).catch(() => ({ modelReady: false, preparing: false, dataSaver: isDataSaver() }))
      : Promise.resolve({ modelReady: false, preparing: Boolean(localPreparation), dataSaver: isDataSaver() });
  }

  window.KieloSpeech = { getStatus, getLocalStatus: localVoiceStatus, getLastPlaybackMode: () => lastPlaybackMode, speak, stop };
  if ("speechSynthesis" in window) {
    deviceVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", deviceVoices);
  }
  const pageContent = document.getElementById("page-content");
  if (pageContent) {
    speechContentObserver = new MutationObserver(() => {
      if (!warmupStarted || localPreparation || !selectedLocalStyle()) return;
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(observeVisibleSpeech, 110);
    });
    speechContentObserver.observe(pageContent, { childList: true, subtree: true });
  }
  document.addEventListener("change", (event) => {
    if (event.target?.id !== "finnish-neural-voice") return;
    window.setTimeout(() => {
      if (!selectedLocalStyle()) return;
      warmupStarted = false;
      startBackgroundWarmup();
    }, 0);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !warmupStarted) scheduleBackgroundWarmup();
  });
  const scheduleWarmupAfterPageLoad = () => scheduleBackgroundWarmup();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleWarmupAfterPageLoad, { once: true });
  else scheduleWarmupAfterPageLoad();
  window.addEventListener("pagehide", stop);
})();
