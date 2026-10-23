// Local Finnish speech using Supertonic 3. Model files are fetched from the
// pinned Hugging Face revision only after the learner asks to hear a phrase.
import { loadTextToSpeech, loadVoiceStyle, writeWavFile } from "./supertonic-helper.js?v=4";

const MODEL_ROOT = "https://huggingface.co/supertone-oss-archive/supertonic-3/resolve/aafc6e32416a594460b32413efc49d7fe4ce6d46";
const ONNX_ROOT = `${MODEL_ROOT}/onnx`;
const STYLE_ROOT = `${MODEL_ROOT}/voice_styles`;
const QUANTIZED_ROOT = "https://huggingface.co/csukuangfj2/sherpa-onnx-supertonic-3-tts-int8-2026-05-11/resolve/cca5a0e6c96e1d2c720986bf7e75fcc81dee3ae4";
const MODEL_SIZE_LABEL = "about 140 MB";
let enginePromise = null;
let engine = null;
let stylePromises = new Map();
const audioCache = new Map();
const synthesisJobs = new Map();
const synthesisQueue = [];
let synthesisActive = false;

function loadEngine(onProgress) {
  if (engine) return Promise.resolve({ textToSpeech: engine });
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    const progress = (name, current, total) => onProgress?.({ phase: "loading", name, current, total });
    // The int8 voice graphs use DequantizeLinear operations that some browser
    // WebGPU providers expose but cannot execute. WASM supports these graphs.
    return loadTextToSpeech(QUANTIZED_ROOT, { executionProviders: ["wasm"], graphOptimizationLevel: "all" }, progress, { modelSuffix: ".int8", configRoot: QUANTIZED_ROOT, textProcessorRoot: ONNX_ROOT });
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

function synthesisKey(text, styleId, speed) {
  return `${styleId}\u0000${speed}\u0000${text}`;
}

export function hasAudio(text, styleId = "F1", speed = 1.05) {
  const safeStyle = /^[FM][1-5]$/.test(styleId) ? styleId : "F1";
  return audioCache.has(synthesisKey(String(text).trim(), safeStyle, Number(speed) || 1.05));
}

export async function prepare(styleId = "F1", onProgress) {
  const safeStyle = /^[FM][1-5]$/.test(styleId) ? styleId : "F1";
  await Promise.all([loadEngine(onProgress), loadStyle(safeStyle)]);
  return true;
}

function runSynthesisQueue() {
  if (synthesisActive || !synthesisQueue.length) return;
  synthesisQueue.sort((a, b) => b.priority - a.priority || a.order - b.order);
  const job = synthesisQueue.shift();
  synthesisActive = true;
  job.started = true;
  (async () => {
    const [{ textToSpeech }, style] = await Promise.all([loadEngine((progress) => job.report(progress)), loadStyle(job.styleId)]);
    job.report({ phase: "generating", current: 0, total: 8 });
    const { wav, duration } = await textToSpeech.call(job.text, "fi", style, 8, job.speed, 0.18, (current, total) => {
      job.report({ phase: "generating", current, total });
    });
    const sampleCount = Math.floor(textToSpeech.sampleRate * duration[0]);
    const wavBuffer = writeWavFile(wav.slice(0, sampleCount), textToSpeech.sampleRate);
    const result = new Blob([wavBuffer], { type: "audio/wav" });
    audioCache.set(job.key, result);
    while (audioCache.size > 50) audioCache.delete(audioCache.keys().next().value);
    return result;
  })().then(job.resolve, job.reject).finally(() => {
    synthesisJobs.delete(job.key);
    synthesisActive = false;
    runSynthesisQueue();
  });
}

function queueSynthesis(text, styleId, speed, priority, onProgress) {
  const safeStyle = /^[FM][1-5]$/.test(styleId) ? styleId : "F1";
  const normalizedSpeed = Math.min(1.4, Math.max(0.6, Number(speed) || 1.05));
  const normalizedText = String(text).trim();
  const key = synthesisKey(normalizedText, safeStyle, normalizedSpeed);
  if (audioCache.has(key)) return Promise.resolve(audioCache.get(key));
  const pending = synthesisJobs.get(key);
  if (pending) {
    if (onProgress) pending.listeners.add(onProgress);
    if (!pending.started && priority > pending.priority) pending.priority = priority;
    runSynthesisQueue();
    return pending.promise;
  }

  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  const job = {
    key, text: normalizedText, styleId: safeStyle, speed: normalizedSpeed, priority,
    order: synthesisJobs.size, started: false, resolve, reject, promise,
    listeners: new Set(onProgress ? [onProgress] : []),
    report(progress) {
      for (const listener of this.listeners) {
        try { listener(progress); } catch {}
      }
    },
  };
  synthesisJobs.set(key, job);
  synthesisQueue.push(job);
  runSynthesisQueue();
  return promise;
}

export function synthesize(text, styleId = "F1", speed = 1.05, onProgress) {
  const safeStyle = /^[FM][1-5]$/.test(styleId) ? styleId : "F1";
  onProgress?.({ phase: "loading", current: 0, total: 4, size: MODEL_SIZE_LABEL });
  return queueSynthesis(text, safeStyle, speed, 2, onProgress);
}

export function preload(text, styleId = "F1", speed = 1.05) {
  return queueSynthesis(text, styleId, speed, 0).catch(() => null);
}

export const modelDownloadLabel = MODEL_SIZE_LABEL;
export function isReady() {
  return Boolean(engine);
}

export function isPreparing() {
  return Boolean(enginePromise && !engine);
}
