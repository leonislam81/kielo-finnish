(() => {
  const SITE_API = "https://kielo-finnish.openmoss1.chatgpt.site";
  const VOICE_CACHE_LIMIT = 40;
  const audioCache = new Map();
  let statusCache = null;
  let statusExpiresAt = 0;
  let statusRequest = null;
  let activeAudio = null;
  let activeFinish = null;
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

  function showMessage(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toast.kieloTimer);
    toast.kieloTimer = window.setTimeout(() => toast.classList.remove("visible"), 3_200);
  }

  function stop() {
    playbackId += 1;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.removeAttribute("src");
      activeAudio.load();
      activeAudio = null;
    }
    if (activeFinish) {
      const finish = activeFinish;
      activeFinish = null;
      finish(false);
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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

  function speakOnDevice(text, rate, currentPlaybackId, quietIfMissing = false) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      showMessage("Audio playback is not available in this browser.");
      return Promise.resolve(false);
    }
    const voices = window.speechSynthesis.getVoices();
    const finnish = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("fi"));
    if (!finnish.length) {
      if (!quietIfMissing) showMessage("No Finnish voice is installed in this browser. Try an online Finnish voice or open a Yle learning clip.");
      return Promise.resolve(false);
    }
    const selectedName = localStorage.getItem("kielo-finnish-voice") || "";
    const selected = finnish.find((voice) => voice.name === selectedName) || finnish[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fi-FI";
    utterance.rate = rate;
    utterance.voice = selected;
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
      utterance.onerror = () => finish(false);
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
    const voice = localStorage.getItem("kielo-neural-voice") || "device";
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
    const played = await speakOnDevice(text.trim(), normalizedRate, currentPlaybackId, onlineVoiceFailed);
    if (!played && onlineVoiceFailed) showMessage("The online Finnish voice could not connect, and this browser has no Finnish voice installed. Check the voice service or open a Yle clip.");
    return played;
  }

  window.KieloSpeech = { getStatus, speak, stop };
  window.addEventListener("pagehide", stop);
})();
