// Local Finnish speech using Supertonic 3. Model files are fetched from the
// pinned Hugging Face revision only after the learner asks to hear a phrase.
import { loadTextToSpeech, loadVoiceStyle, writeWavFile } from "./supertonic-helper.js";

const MODEL_ROOT = "https://huggingface.co/supertone-oss-archive/supertonic-3/resolve/aafc6e32416a594460b32413efc49d7fe4ce6d46";
const ONNX_ROOT = `${MODEL_ROOT}/onnx`;
const STYLE_ROOT = `${MODEL_ROOT}/voice_styles`;
const MODEL_SIZE_LABEL = "about 398 MB";
let enginePromise = null;
let engine = null;
let stylePromises = new Map();
const audioCache = new Map();

function loadEngine(onProgress) {
  if (engine) return Promise.resolve({ textToSpeech: engine });
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    const progress = (name, current, total) => onProgress?.({ phase: "loading", name, current, total });
    if ("gpu" in navigator) {
      try {
        return await loadTextToSpeech(ONNX_ROOT, { executionProviders: ["webgpu"], graphOptimizationLevel: "all" }, progress);
      } catch (error) {
        console.info("WebGPU speech is unavailable; switching to WebAssembly.", error);
      }
    }
    return loadTextToSpeech(ONNX_ROOT, { executionProviders: ["wasm"], graphOptimizationLevel: "all" }, progress);
  })().then((loaded) => {
    engine = loaded.textToSpeech;
    return loaded;
  }).catch((error) => {
    enginePromise = null;
    throw error;
  });
  return enginePromise;
}

function loadStyle(styleId) {
  if (!stylePromises.has(styleId)) {
    stylePromises.set(styleId, loadVoiceStyle([`${STYLE_ROOT}/${styleId}.json`]).catch((error) => {
      stylePromises.delete(styleId);
      throw error;
    }));
  }
  return stylePromises.get(styleId);
}

export async function synthesize(text, styleId = "F1", speed = 1.05, onProgress) {
  const safeStyle = /^[FM][1-5]$/.test(styleId) ? styleId : "F1";
  const cacheKey = `${safeStyle}\u0000${speed}\u0000${text}`;
  if (audioCache.has(cacheKey)) return audioCache.get(cacheKey);

  onProgress?.({ phase: "loading", current: 0, total: 4, size: MODEL_SIZE_LABEL });
  const [{ textToSpeech }, style] = await Promise.all([loadEngine(onProgress), loadStyle(safeStyle)]);
  onProgress?.({ phase: "generating", current: 0, total: 8 });
  const { wav, duration } = await textToSpeech.call(text, "fi", style, 8, speed, 0.18, (current, total) => {
    onProgress?.({ phase: "generating", current, total });
  });
  const sampleCount = Math.floor(textToSpeech.sampleRate * duration[0]);
  const wavBuffer = writeWavFile(wav.slice(0, sampleCount), textToSpeech.sampleRate);
  const result = new Blob([wavBuffer], { type: "audio/wav" });
  audioCache.set(cacheKey, result);
  while (audioCache.size > 50) audioCache.delete(audioCache.keys().next().value);
  return result;
}

export const modelDownloadLabel = MODEL_SIZE_LABEL;
export function isReady() {
  return Boolean(engine);
}
