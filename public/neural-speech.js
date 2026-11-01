(() => {
  const SITE_API = "https://kielo-finnish.openmoss1.chatgpt.site";
  const VOICE_CACHE_LIMIT = 40;
  const DEVICE_PREVIEW_START_TIMEOUT = 1_200;
  const LOCAL_SPEECH_URL = "./supertonic-speech.js?v=17";
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
  let localSpeechApi = null;
  let localPreparation = null;
  let warmupStarted = false;
  let speechObserver = null;
  let speechContentObserver = null;
  let scanFrame = 0;
  let queuedShortPreloads = 0;
  let queuedLongPreloads = 0;
  let installedSpeechVoices = [];
  let recentPointerSpeech = null;
  const SPEECH_BUTTON_SELECTOR = "[data-speak],[data-topic-speak],[data-dictionary-speak],[data-daily-speak]";
  const speechIntentTimers = new WeakMap();
  const visiblePreloadTimers = new WeakMap();
  // Prepare a small set of short, visible words before the learner taps them.
  // A bounded queue keeps first playback responsive without generating the
  // whole dictionary in the background; taps promote their own clip.
  const MAX_SHORT_BACKGROUND_PRELOADS = 12;
  const MAX_LONG_BACKGROUND_PRELOADS = 0;
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
    localSpeechModule ||= import(LOCAL_SPEECH_URL).then((speech) => {
      localSpeechApi = speech;
      return speech;
    }).catch((error) => {
      localSpeechModule = null;
      localSpeechApi = null;
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
    if (button.hasAttribute("data-daily-speak")) return button.dataset.speechText || "";
    return "";
  }

  function speechRateForButton(button) {
    if (button.dataset.speakRate) return Number(button.dataset.speakRate) || 0.78;
    if (button.hasAttribute("data-speak")) return 0.78;
    return Number(localStorage.getItem("kielo-finnish-rate") || "0.86");
  }

  function cancelVisiblePreload(button) {
    const pending = button && visiblePreloadTimers.get(button);
    if (!pending) return;
    window.clearTimeout(pending.timer);
    visiblePreloadTimers.delete(button);
    if (pending.isShortWordOrPhrase) queuedShortPreloads = Math.max(0, queuedShortPreloads - 1);
    else queuedLongPreloads = Math.max(0, queuedLongPreloads - 1);
    delete button.dataset.kieloPreloadKey;
    delete button.dataset.kieloPreloadPriority;
  }

  function scheduleVisiblePreload(button, priority = 0) {
    const text = speechTextForButton(button)?.trim();
    const style = selectedLocalStyle();
    // Only words near the learner's view are prepared. Longer sentences are
    // synthesized on demand so background work stays bounded.
    if (!text || !style || isDataSaver() || !button.isConnected || !window.KieloSpeech) return;
    const speed = synthesisSpeed(speechRateForButton(button));
    const isShortWordOrPhrase = text.length <= 32;
    const key = `${style}\u0000${speed}\u0000${text}`;
    const marker = JSON.stringify([style, speed, text, "prepared-clip"]);
    const previousPriority = Number(button.dataset.kieloPreloadPriority ?? -1);
    if (button.dataset.kieloPreloadKey === marker && priority <= previousPriority) return;
    if (priority > 0) cancelVisiblePreload(button);
    if (priority === 0 && isShortWordOrPhrase && queuedShortPreloads >= MAX_SHORT_BACKGROUND_PRELOADS) return;
    if (priority === 0 && !isShortWordOrPhrase && queuedLongPreloads >= MAX_LONG_BACKGROUND_PRELOADS) return;
    button.dataset.kieloPreloadKey = marker;
    button.dataset.kieloPreloadPriority = String(priority);
    if (isShortWordOrPhrase) queuedShortPreloads += 1;
    else queuedLongPreloads += 1;
    const prepareClip = () => {
      visiblePreloadTimers.delete(button);
      if (!button.isConnected) {
        if (button.dataset.kieloPreloadKey === marker) delete button.dataset.kieloPreloadKey;
        if (isShortWordOrPhrase) queuedShortPreloads = Math.max(0, queuedShortPreloads - 1);
        else queuedLongPreloads = Math.max(0, queuedLongPreloads - 1);
        return;
      }
      let prepared = false;
      localSpeech().then(async (speech) => {
        // Restore a saved clip or prepare this visible short word in advance.
        const blob = await speech.preload(text, style, speed, true, priority);
        if (blob) {
          await decodeLocalAudio(blob, key);
          prepared = true;
        }
      }).catch(() => {
        if (button.dataset.kieloPreloadKey === marker) delete button.dataset.kieloPreloadKey;
      }).finally(() => {
        if (!prepared && button.dataset.kieloPreloadKey === marker) {
          delete button.dataset.kieloPreloadKey;
          delete button.dataset.kieloPreloadPriority;
        }
        if (isShortWordOrPhrase) queuedShortPreloads = Math.max(0, queuedShortPreloads - 1);
        else queuedLongPreloads = Math.max(0, queuedLongPreloads - 1);
        if (prepared && document.visibilityState !== "hidden") observeVisibleSpeech();
      });
    };
    if (priority === 0) {
      const timer = window.setTimeout(prepareClip, 0);
      visiblePreloadTimers.set(button, { timer, isShortWordOrPhrase });
    } else prepareClip();
  }

  function observeVisibleSpeech() {
    const content = document.getElementById("page-content");
    if (!content || !selectedLocalStyle() || isDataSaver()) return;
    const selector = SPEECH_BUTTON_SELECTOR;
    if (speechObserver) speechObserver.disconnect();
    if ("IntersectionObserver" in window) {
      speechObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            speechObserver.unobserve(entry.target);
            scheduleVisiblePreload(entry.target);
          }
        }
      }, { rootMargin: "320px 0px" });
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

  function primeSpeechOutput(target) {
    if (!target?.closest?.(SPEECH_BUTTON_SELECTOR)) return;
    // Resume audio while the pointer/key gesture is still active. This keeps a
    // prepared Finnish clip from waiting for AudioContext's first resume after
    // the click handler has already started.
    const context = prepareAudioContext();
    if (context?.state === "suspended") void context.resume().catch(() => {});
    try {
      deviceVoices();
      if (window.speechSynthesis?.paused) window.speechSynthesis.resume();
    } catch {}
  }

  function startPointerSpeech(event) {
    if (event.button !== 0) return;
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    const text = button && speechTextForButton(button)?.trim();
    if (!text || button.disabled) return;
    cancelSpeechIntent(button);
    cancelVisiblePreload(button);
    const startedAt = performance.now();
    recentPointerSpeech = { button, startedAt };
    void speak(text, speechRateForButton(button));
    window.setTimeout(() => {
      if (recentPointerSpeech?.button === button && recentPointerSpeech.startedAt === startedAt) recentPointerSpeech = null;
    }, 1_000);
  }

  function consumePointerSpeechClick(event) {
    if (!event.detail || !recentPointerSpeech) return;
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    if (!button || button !== recentPointerSpeech.button || performance.now() - recentPointerSpeech.startedAt > 1_000) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    recentPointerSpeech = null;
  }

  function queueSpeechIntent(button, delay = 0) {
    if (!button || button.disabled) return;
    const existing = speechIntentTimers.get(button);
    if (existing) window.clearTimeout(existing);
    const timer = window.setTimeout(() => {
      speechIntentTimers.delete(button);
      if (button.isConnected) scheduleVisiblePreload(button, 1);
    }, delay);
    speechIntentTimers.set(button, timer);
  }

  function cancelSpeechIntent(button) {
    const timer = button && speechIntentTimers.get(button);
    if (!timer) return;
    window.clearTimeout(timer);
    speechIntentTimers.delete(button);
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
      return { started: Promise.resolve(false), finished: Promise.resolve(false) };
    }
    const voices = deviceVoices();
    const instantVoices = voices.filter((voice) => voice.localService !== false);
    const localFinnish = instantVoices.filter((voice) => voice.lang?.toLowerCase().startsWith("fi"));
    // Some browsers expose a Finnish voice through their speech service rather
    // than installing it on the device. Try that only as a short first-sound
    // preview while the chosen on-device Finnish clip is being generated.
    const browserFinnish = voices.filter((voice) => voice.localService === false && voice.lang?.toLowerCase().startsWith("fi"));
    const finnish = [...localFinnish, ...browserFinnish];
    // A few browsers populate getVoices() asynchronously. Still submit a
    // Finnish-tagged utterance in the original tap when the list is empty;
    // the browser can use its default voice while the selected neural clip is
    // prepared. voiceschanged will populate the picker for later taps.
    const selectedName = localStorage.getItem("kielo-finnish-voice") || "";
    const neuralVoice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const preferMale = /:M[1-5]$|charon|harri/i.test(neuralVoice);
    const matchesPreferredGender = (voice) => {
      const name = String(voice.name || "").toLowerCase();
      const looksFemale = /female|woman|zira|samantha|victoria|karen|tessa|moira|fiona|heidi|selma|noora|jenny|aria|ava|emma|salli|joanna|kendra|michelle|linda|susan/.test(name);
      const looksMale = /(^|[^a-z])(male|man)([^a-z]|$)|\b(alex|daniel|fred|david|mark|george|james|harri|mikko|liam|guy|ryan|matthew|joey|justin|john|bruce|aaron|arthur|oliver)\b/.test(name);
      return preferMale ? looksMale : looksFemale;
    };
    const localFinnishGenderMatch = localFinnish.find(matchesPreferredGender);
    const finnishGenderMatch = finnish.find(matchesPreferredGender);
    const localGenderMatch = instantVoices.find(matchesPreferredGender);
    const configuredVoice = voices.find((voice) => voice.name === selectedName && voice.localService !== false && voice.lang?.toLowerCase().startsWith("fi"));
    // Start with an installed voice so a network-backed Finnish voice cannot
    // make the first tap wait for its own startup request. The selected local
    // Finnish voice still prepares behind this brief preview.
    const selected = configuredVoice || localFinnishGenderMatch || localFinnish[0] || localGenderMatch || instantVoices.find((voice) => voice.default) || instantVoices[0] || finnishGenderMatch || finnish[0];
    if (!selected && voices.length) return null;
    const utterance = new SpeechSynthesisUtterance(text);
    // Request Finnish for Finnish voices. If the preview falls back to another
    // installed voice, request that voice's own language so it starts promptly.
    utterance.lang = selected?.lang?.toLowerCase().startsWith("fi") ? "fi-FI" : selected?.lang || voices.find((voice) => voice.default)?.lang || voices[0]?.lang || "fi-FI";
    utterance.rate = rate;
    if (selected) utterance.voice = selected;
    let resolveStarted;
    let resolveFinished;
    let startReported = false;
    let settled = false;
    let started = false;
    let startTimer = 0;
    const startedPromise = new Promise((resolve) => { resolveStarted = resolve; });
    const finishedPromise = new Promise((resolve) => { resolveFinished = resolve; });
    const reportStarted = (didStart) => {
      if (startReported) return;
      startReported = true;
      resolveStarted(didStart);
    };
    const finish = (played) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(startTimer);
      if (!started) reportStarted(false);
      if (activeUtterance === utterance) activeUtterance = null;
      if (activeFinish === finish) activeFinish = null;
      resolveFinished(played);
    };
    activeFinish = finish;
    activeUtterance = utterance;
    utterance.onstart = () => {
      started = true;
      reportStarted(true);
      window.clearTimeout(startTimer);
      if (currentPlaybackId === playbackId) showMessage(selected ? "Playing an immediate browser preview…" : "Trying the browser’s default Finnish voice…", true);
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
      return { started: startedPromise, finished: finishedPromise };
    }
    const begin = () => {
      if (currentPlaybackId !== playbackId) return finish(false);
      try {
        window.speechSynthesis.speak(utterance);
        // Some browsers accept an utterance but never start it when their
        // speech service has no usable voice. A ready local clip may win first.
        startTimer = window.setTimeout(() => {
          if (started || settled) return;
          if (currentPlaybackId === playbackId) window.speechSynthesis.cancel();
          finish(false);
        }, DEVICE_PREVIEW_START_TIMEOUT);
      } catch {
        finish(false);
      }
    };
    // Chromium can briefly keep a cancelled utterance in its queue. A
    // zero-delay reset is only needed to interrupt active speech; idle taps
    // submit the preview immediately without this extra turn.
    if (afterCancel) window.setTimeout(begin, 0);
    else begin();
    return { get hasStarted() { return started; }, localVoice: selected ? selected.localService !== false : voices.length === 0, started: startedPromise, finished: finishedPromise };
  }

  function cancelDevicePreview(currentPlaybackId) {
    if (currentPlaybackId !== playbackId || !activeUtterance || !("speechSynthesis" in window)) return;
    const utterance = activeUtterance;
    const finish = activeFinish;
    try { window.speechSynthesis.cancel(); } catch {}
    if (activeUtterance === utterance && activeFinish === finish && finish) finish(false);
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
    const preparedAudio = voice.startsWith("local:") && localSpeechApi?.getAudio?.(phrase, style, speed);
    if (preparedAudio) return playLocalAudio(preparedAudio, currentPlaybackId, localKey);
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
      let firstResult = null;
      try {
        const speechApi = await localSpeech();
        if (currentPlaybackId !== playbackId) return false;
        // Reuse a clip from the persistent cache before spending time on model
        // inference. Keep an already-started browser preview audible; otherwise
        // switch straight to the learner's selected Finnish voice.
        if (typeof speechApi.getCachedAudio === "function") {
          const savedAudio = await Promise.race([
            speechApi.getCachedAudio(phrase, style, speed),
            new Promise((resolve) => window.setTimeout(() => resolve(null), 70)),
          ]);
          if (currentPlaybackId !== playbackId) return false;
          if (savedAudio) {
            if (instantPreview?.hasStarted) {
              void decodeLocalAudio(savedAudio, localKey).catch(() => {});
              return true;
            }
            if (instantPreview) cancelDevicePreview(currentPlaybackId);
            return playLocalAudio(savedAudio, currentPlaybackId, localKey);
          }
        }
        // Let the browser's quick voice begin before ONNX inference starts.
        // The first model run can briefly occupy the main thread, which used
        // to delay the speechSynthesis start event and make a fresh tap sound
        // as if it were waiting for the selected neural voice to load.
        if (instantPreview) {
        // Do not make a learner wait half a second for the browser voice before
        // starting local synthesis. A very short grace still lets an installed
        // voice claim the first sound while the selected Finnish voice prepares.
        const previewGraceMs = instantPreview.localVoice ? 45 : 25;
        const previewStarted = await Promise.race([
          instantPreview.started,
          new Promise((resolve) => window.setTimeout(() => resolve(false), previewGraceMs)),
        ]);
        if (currentPlaybackId !== playbackId) return false;
        if (previewStarted) {
          // The immediate browser voice has already started. Generate the
          // selected voice in the WASM proxy worker now, so the next tap can
          // use a decoded, instant replay without making this preview wait.
          previewPlayed = true;
          void speechApi.synthesize(phrase, style, speed).then((blob) => decodeLocalAudio(blob, localKey)).then(() => {
            if (currentPlaybackId !== playbackId) return;
            showMessage("Your selected Finnish voice is ready for instant replay.");
          }).catch(() => {
            if (currentPlaybackId === playbackId) showMessage("The quick voice played. Your selected voice will finish preparing in the background.");
          });
          return instantPreview.finished.then((played) => Boolean(played));
        }
        }
        const audioPromise = speechApi.synthesize(phrase, style, speed, (progress) => {
          if (currentPlaybackId !== playbackId || previewPlayed) return;
          if (progress.phase === "loading") {
            const stage = progress.current ? ` · model ${progress.current} of ${progress.total}` : "";
            showMessage(`Preparing the free Finnish voice${stage}. First use downloads about 140 MB; text stays on this device.`, true);
          } else {
            showMessage(`Generating Finnish speech · ${progress.current} of ${progress.total}`, true);
          }
        });
        if (instantPreview) {
          firstResult = await Promise.race([
            instantPreview.started.then((started) => ({ kind: "preview", started })),
            audioPromise.then((blob) => ({ kind: "audio", blob }), (error) => ({ kind: "error", error })),
          ]);
          // If the local clip finishes just before the browser reports its
          // preview start, give that already-queued device voice a brief chance
          // to become audible. This avoids replacing the first sound with a
          // decode/playback handoff when the browser is only a moment behind.
          if (firstResult.kind === "audio" && !instantPreview.hasStarted) {
            const previewStarted = await Promise.race([
              instantPreview.started,
              new Promise((resolve) => window.setTimeout(() => resolve(false), 120)),
            ]);
            if (previewStarted) firstResult = { kind: "preview", started: true };
          }
          if (firstResult.kind === "preview" && firstResult.started && currentPlaybackId === playbackId) {
            previewPlayed = true;
            // Return as soon as sound starts. Prepare this phrase behind it so
            // the selected Finnish voice is cached for the next press.
            void audioPromise.then((blob) => decodeLocalAudio(blob, localKey)).then(() => {
              if (currentPlaybackId === playbackId) showMessage("Your selected Finnish voice is ready for instant replay.");
            }).catch(() => {
              if (currentPlaybackId === playbackId) showMessage("The quick preview played. The selected Finnish voice is still preparing.");
            });
            return instantPreview.finished.then((played) => Boolean(played));
          }
          if (firstResult.kind === "error") {
            if (await instantPreview.started) return true;
            throw firstResult.error;
          }
        }
        if (!instantPreview) {
          const modelReady = speechApi.isReady();
          showMessage(modelReady
            ? "Creating Finnish speech on this device…"
            : "Preparing the free Finnish voice model. First setup downloads about 140 MB; text stays on this device.", true);
        }
        const blob = firstResult?.kind === "audio" ? firstResult.blob : await audioPromise;
        if (currentPlaybackId !== playbackId) return false;
        if (instantPreview) cancelDevicePreview(currentPlaybackId);
        const played = await playLocalAudio(blob, currentPlaybackId, localKey);
        clearMessage();
        if (!played && currentPlaybackId === playbackId) showMessage("The Finnish voice is ready. Tap again if this browser blocked audio playback.");
        return played;
      } catch (error) {
        if (currentPlaybackId !== playbackId) return false;
        localSpeechModule = null;
        clearMessage();
        if (instantPreview && !previewPlayed) {
          previewPlayed = await instantPreview.started;
          if (previewPlayed) {
            showMessage("The quick preview started. The selected Finnish voice could not finish preparing.");
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
    if (voice === "device") {
      // Do not wait for the device utterance's 2.5s failure timer before
      // falling back. On browsers without a Finnish voice, that timer made
      // every tap feel like it was loading before the local Finnish voice ran.
      // localFallback races the device preview briefly, then starts the
      // selected on-device voice immediately while the preview can still win.
      return localFallback();
    }

    // Remote voice setup can take a network round trip. Keep that work in the
    // background after the device preview so it never delays the first sound.
    if (instantPreview) {
      void getStatus().then((status) => status.enabled ? requestNeuralAudio(phrase, voice, paceName(normalizedRate)) : null).catch(() => {});
      return instantPreview.finished;
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
  // Prime the browser's audio output before the speech control is activated.
  // This also helps browsers that only unlock Web Audio inside a user gesture.
  document.addEventListener("pointerdown", (event) => primeSpeechOutput(event.target), { capture: true, passive: true });
  // Begin on press rather than release so a tap starts audio in its original
  // user gesture, without waiting for the rest of the click event sequence.
  document.addEventListener("pointerdown", startPointerSpeech, { capture: true, passive: true });
  document.addEventListener("pointercancel", () => { recentPointerSpeech = null; }, true);
  document.addEventListener("click", consumePointerSpeechClick, true);
  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    if (button && !button.contains(event.relatedTarget)) queueSpeechIntent(button, 120);
  }, { capture: true, passive: true });
  document.addEventListener("pointerout", (event) => {
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    if (button && !button.contains(event.relatedTarget)) cancelSpeechIntent(button);
  }, { capture: true, passive: true });
  document.addEventListener("focusin", (event) => {
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    if (button) queueSpeechIntent(button);
  }, true);
  document.addEventListener("focusout", (event) => {
    const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
    if (button) cancelSpeechIntent(button);
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      primeSpeechOutput(event.target);
      const button = event.target?.closest?.(SPEECH_BUTTON_SELECTOR);
      if (button) cancelVisiblePreload(button);
    }
  }, true);
  const pageContent = document.getElementById("page-content");
  if (pageContent) {
    speechContentObserver = new MutationObserver(() => {
      if (!selectedLocalStyle() || isDataSaver()) return;
      window.cancelAnimationFrame(scanFrame);
      scanFrame = window.requestAnimationFrame(observeVisibleSpeech);
    });
    speechContentObserver.observe(pageContent, { childList: true, subtree: true });
  }
  document.addEventListener("change", (event) => {
    if (event.target?.id !== "finnish-neural-voice") return;
    window.setTimeout(() => {
      if (!selectedLocalStyle()) return;
      warmupStarted = false;
      startBackgroundWarmup();
      observeVisibleSpeech();
    }, 0);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !warmupStarted) scheduleBackgroundWarmup();
  });
  const scheduleWarmupAfterPageLoad = () => {
    scheduleBackgroundWarmup();
    observeVisibleSpeech();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleWarmupAfterPageLoad, { once: true });
  else scheduleWarmupAfterPageLoad();
  window.addEventListener("pagehide", stop);
})();
