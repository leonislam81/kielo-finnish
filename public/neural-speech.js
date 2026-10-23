(() => {
  const SITE_API = "https://kielo-finnish.openmoss1.chatgpt.site";
  const VOICE_CACHE_LIMIT = 40;
  const LOCAL_SPEECH_URL = "./supertonic-speech.js?v=7";
  const audioCache = new Map();
  const decodedLocalAudio = new WeakMap();
  let statusCache = null;
  let statusExpiresAt = 0;
  let statusRequest = null;
  let activeAudio = null;
  let activeFinish = null;
  let activeSource = null;
  let audioContext = null;
  let localSpeechModule = null;
  let localPreparation = null;
  let warmupStarted = false;
  let speechObserver = null;
  let speechContentObserver = null;
  let scanTimer = 0;
  let queuedPreloads = 0;
  // Keep only a tiny audio queue ahead of the learner. A long queue competes
  // with a newly requested phrase and makes the first tap feel unresponsive.
  const MAX_BACKGROUND_PRELOADS = 2;
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
        void decodeLocalAudio(blob).catch(() => {});
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
    const run = () => startBackgroundWarmup();
    if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 1400 });
    else window.setTimeout(run, 500);
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

  function decodeLocalAudio(blob) {
    const context = prepareAudioContext();
    if (!context || !blob) return Promise.reject(new Error("Audio decoding is unavailable."));
    let decoded = decodedLocalAudio.get(blob);
    if (!decoded) {
      decoded = blob.arrayBuffer().then((buffer) => context.decodeAudioData(buffer));
      decodedLocalAudio.set(blob, decoded);
      decoded.catch(() => decodedLocalAudio.delete(blob));
    }
    return decoded;
  }

  function playbackStarted() {
    showMessage("Playing Finnish voice…", true);
  }

  function stop() {
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
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    clearMessage();
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

  function playLocalAudio(blob, currentPlaybackId) {
    const context = prepareAudioContext();
    if (!context) return playAudio(blob, currentPlaybackId);
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
      (async () => {
        try {
          const audioBuffer = await decodeLocalAudio(blob);
          if (currentPlaybackId !== playbackId) return finish(false);
          source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(context.destination);
          activeSource = source;
          source.onended = () => finish(currentPlaybackId === playbackId);
          if (context.state === "suspended") await context.resume();
          if (currentPlaybackId !== playbackId) return finish(false);
          source.start(0);
          playbackStarted();
        } catch {
          finish(false);
        }
      })();
    });
  }

  function speakOnDevice(text, rate, currentPlaybackId, quietIfMissing = false) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      showMessage("Audio playback is not available in this browser.");
      return Promise.resolve(false);
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return Promise.resolve(false);
    const finnish = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("fi"));
    const selectedName = localStorage.getItem("kielo-finnish-voice") || "";
    const neuralVoice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const preferMale = /:M[1-5]$/.test(neuralVoice);
    const genderMatch = voices.find((voice) => {
      const name = String(voice.name || "").toLowerCase();
      const looksFemale = /female|woman|zira|samantha|victoria|karen|tessa|moira|fiona|heidi|selma|noora|jenny|aria|ava|emma|salli|joanna|kendra|michelle|linda|susan/.test(name);
      const looksMale = /(^|[^a-z])(male|man)([^a-z]|$)|\b(alex|daniel|fred|david|mark|george|james|harri|mikko|liam|guy|ryan|matthew|joey|justin|john|bruce|aaron|arthur|oliver)\b/.test(name);
      return preferMale ? looksMale : looksFemale;
    });
    const selected = finnish[0] || voices.find((voice) => voice.name === selectedName) || genderMatch || voices.find((voice) => voice.default) || voices[0];
    const utterance = new SpeechSynthesisUtterance(text);
    // Keep Finnish as the requested language even if the quick preview has to
    // borrow an installed system voice with another language tag.
    utterance.lang = "fi-FI";
    utterance.rate = rate;
    if (selected) utterance.voice = selected;
    return new Promise((resolve) => {
      let settled = false;
      const finish = (played) => {
        if (settled) return;
        settled = true;
        if (activeFinish === finish) activeFinish = null;
        resolve(played);
      };
      activeFinish = finish;
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
      window.speechSynthesis.speak(utterance);
    });
  }

  async function speak(text, rate = 0.86) {
    if (typeof text !== "string" || !text.trim()) return false;
    stop();
    lastPlaybackMode = "selected";
    const currentPlaybackId = playbackId;
    const normalizedRate = Math.min(1.15, Math.max(0.6, Number(rate) || 0.86));
    const voice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const style = voice.startsWith("local:") ? voice.slice(6) : localStorage.getItem("kielo-supertonic-style") || "F1";
    const localFallback = async () => {
      if (currentPlaybackId !== playbackId) return false;
      try {
        const speechPromise = localSpeech();
        const speechApi = await speechPromise;
        if (currentPlaybackId !== playbackId) return false;
        const synthesisSpeedValue = synthesisSpeed(normalizedRate);
        const hasCachedAudio = speechApi.hasAudio(text.trim(), style, synthesisSpeedValue);
        const canPlayQuickPreview = !hasCachedAudio && "speechSynthesis" in window && window.speechSynthesis.getVoices().length > 0;
        const quickPreview = canPlayQuickPreview
          ? speakOnDevice(text.trim(), normalizedRate, currentPlaybackId, true)
          : null;
        if (!hasCachedAudio && !quickPreview) {
          const modelReady = speechApi.isReady();
          showMessage(modelReady
            ? "Creating Finnish speech on this device…"
            : `Preparing the free Finnish voice model. First setup downloads about 140 MB; text stays on this device.`, true);
        } else if (quickPreview) {
          showMessage("Playing an instant device preview while your selected Finnish voice is prepared.", true);
        }
        const audioPromise = speechApi.synthesize(text.trim(), style, synthesisSpeedValue, (progress) => {
          if (currentPlaybackId !== playbackId) return;
          if (quickPreview) return;
          if (progress.phase === "loading") {
            const stage = progress.current ? ` · model ${progress.current} of ${progress.total}` : "";
            showMessage(`Preparing the free Finnish voice${stage}. First use downloads about 140 MB; text stays on this device.`, true);
          } else {
            showMessage(`Generating Finnish speech · ${progress.current} of ${progress.total}`, true);
          }
        });
        if (quickPreview) {
          const previewPlayed = await quickPreview;
          if (previewPlayed && currentPlaybackId === playbackId) {
            // Generate and decode the chosen neural voice in the background.
            // Its next tap can then start from the audio cache immediately.
            void audioPromise.then((blob) => decodeLocalAudio(blob)).then(() => {
              if (currentPlaybackId === playbackId) showMessage("The selected Finnish voice is ready for quicker replay.");
            }).catch(() => {
              if (currentPlaybackId === playbackId) showMessage("The quick device preview played. The selected voice is still preparing; tap again to retry.");
            });
            lastPlaybackMode = "device-preview";
            showMessage("Quick device preview played. Preparing your selected voice for faster replay.");
            return true;
          }
        }
        const blob = await audioPromise;
        if (currentPlaybackId !== playbackId) return false;
        const played = await playLocalAudio(blob, currentPlaybackId);
        clearMessage();
        if (!played && currentPlaybackId === playbackId) showMessage("The Finnish voice is ready. Tap Preview voice again if this browser blocked audio playback.");
        return played;
      } catch (error) {
        if (currentPlaybackId !== playbackId) return false;
        localSpeechModule = null;
        clearMessage();
        const detail = String(error?.message || "").toLowerCase();
        const failureMessage = /memory|allocation|out of memory|oom/.test(detail)
          ? "This device ran short of browser memory while preparing the free Finnish voice. Close unused tabs and try again."
          : /fetch|network|cors|load failed|timeout|failed to load/.test(detail)
            ? "The free Finnish voice download was interrupted. Reconnect and tap Preview again; your text stays on this device."
            : "The free Finnish voice could not finish setup. Check your connection and browser memory, then tap Preview again.";
        const hasFinnishDeviceVoice = "speechSynthesis" in window && window.speechSynthesis.getVoices().some((item) => item.lang?.toLowerCase().startsWith("fi"));
        if (hasFinnishDeviceVoice) {
          showMessage("The free voice could not load. Trying your installed Finnish voice…", true);
          if (await speakOnDevice(text.trim(), normalizedRate, currentPlaybackId)) {
            clearMessage();
            return true;
          }
        }
        showMessage(failureMessage);
        return false;
      }
    };
    if (voice.startsWith("local:")) {
      prepareAudioContext();
      return localFallback();
    }
    let onlineVoiceFailed = false;
    if (voice !== "device") {
      const status = await getStatus();
      if (currentPlaybackId !== playbackId) return false;
      if (status.enabled) {
        try {
          const blob = await requestNeuralAudio(text.trim(), voice, paceName(normalizedRate));
          if (currentPlaybackId !== playbackId) return false;
          if (await playAudio(blob, currentPlaybackId)) return true;
        } catch {
          if (currentPlaybackId !== playbackId) return false;
          onlineVoiceFailed = true;
        }
      } else {
        onlineVoiceFailed = true;
      }
    }
    if (currentPlaybackId !== playbackId) return false;
    const deviceVoices = "speechSynthesis" in window ? window.speechSynthesis.getVoices() : [];
    const hasFinnishVoice = deviceVoices.some((item) => item.lang?.toLowerCase().startsWith("fi"));
    const selectedDeviceName = localStorage.getItem("kielo-finnish-voice") || "";
    const hasSelectedDeviceVoice = selectedDeviceName && deviceVoices.some((item) => item.name === selectedDeviceName);
    if (voice === "device" && (hasFinnishVoice || hasSelectedDeviceVoice)) {
      const played = await speakOnDevice(text.trim(), normalizedRate, currentPlaybackId, true);
      if (played || currentPlaybackId !== playbackId) return played;
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
  if (document.readyState === "complete") scheduleWarmupAfterPageLoad();
  else window.addEventListener("load", scheduleWarmupAfterPageLoad, { once: true });
  window.addEventListener("pagehide", stop);
})();
