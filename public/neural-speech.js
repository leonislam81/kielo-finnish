(() => {
  const SITE_API = "https://kielo-finnish.openmoss1.chatgpt.site";
  const VOICE_CACHE_LIMIT = 40;
  const audioCache = new Map();
  let statusCache = null;
  let statusExpiresAt = 0;
  let statusRequest = null;
  let activeAudio = null;
  let activeFinish = null;
  let activeSource = null;
  let audioContext = null;
  let localSpeechModule = null;
  let playbackId = 0;

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
      audio.play().catch(() => finish(false));
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
          const audioBuffer = await context.decodeAudioData(await blob.arrayBuffer());
          if (currentPlaybackId !== playbackId) return finish(false);
          source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(context.destination);
          activeSource = source;
          source.onended = () => finish(currentPlaybackId === playbackId);
          if (context.state === "suspended") await context.resume();
          if (currentPlaybackId !== playbackId) return finish(false);
          source.start(0);
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
    const finnish = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("fi"));
    const selectedName = localStorage.getItem("kielo-finnish-voice") || "";
    const selected = voices.find((voice) => voice.name === selectedName) || finnish[0] || voices.find((voice) => voice.default) || voices[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selected?.lang || "fi-FI";
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
    const currentPlaybackId = playbackId;
    const normalizedRate = Math.min(1.15, Math.max(0.6, Number(rate) || 0.86));
    const voice = localStorage.getItem("kielo-neural-voice") || "local:F1";
    const style = voice.startsWith("local:") ? voice.slice(6) : localStorage.getItem("kielo-supertonic-style") || "F1";
    const localFallback = async () => {
      if (currentPlaybackId !== playbackId) return false;
      const firstUse = !localSpeechModule;
      showMessage(firstUse
        ? `Preparing a free Finnish voice on this device. First use downloads ${"about 140 MB"}; your text stays on this device.`
        : "Creating Finnish speech on this device…", true);
      try {
        localSpeechModule ||= import("./supertonic-speech.js?v=6");
        const localSpeech = await localSpeechModule;
        if (currentPlaybackId !== playbackId) return false;
        if (!localSpeech.isReady()) showMessage("Preparing the free Finnish voice model. First use may download about 140 MB; text stays on this device.", true);
        const synthesisSpeed = rate < 0.78 ? 1.28 : rate > 0.93 ? 0.96 : 1.08;
        const blob = await localSpeech.synthesize(text.trim(), style, synthesisSpeed, (progress) => {
          if (currentPlaybackId !== playbackId) return;
          if (progress.phase === "loading") {
            const stage = progress.current ? ` · model ${progress.current} of ${progress.total}` : "";
            showMessage(`Preparing the free Finnish voice${stage}. First use downloads about 140 MB; text stays on this device.`, true);
          } else {
            showMessage(`Generating Finnish speech · ${progress.current} of ${progress.total}`, true);
          }
        });
        if (currentPlaybackId !== playbackId) return false;
        showMessage("Playing Finnish voice…", true);
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

  window.KieloSpeech = { getStatus, speak, stop };
  window.addEventListener("pagehide", stop);
})();
