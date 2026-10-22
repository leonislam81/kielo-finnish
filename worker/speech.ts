const SITE_ORIGINS = new Set([
  "https://kielo-finnish.openmoss1.chatgpt.site",
  "https://leonislam81.github.io",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const VOICES = {
  "gemini-Aoede": { gender: "female", name: "Aoede", provider: "gemini" },
  "gemini-Charon": { gender: "male", name: "Charon", provider: "gemini" },
  "fi-FI-SelmaNeural": { gender: "female", name: "Selma", provider: "azure" },
  "fi-FI-NooraNeural": { gender: "female", name: "Noora", provider: "azure" },
  "fi-FI-HarriNeural": { gender: "male", name: "Harri", provider: "azure" },
} as const;

const DAILY_CHARACTER_HARD_LIMIT = 10_000;
const MAX_TEXT_LENGTH = 180;
const SPEECH_ENDPOINT = "/api/speech/synthesize";

type SpeechEnvironment = Cloudflare.Env & {
  GEMINI_API_KEY?: string;
  AZURE_SPEECH_KEY?: string;
  AZURE_SPEECH_REGION?: string;
  KIELO_NEURAL_VOICE_DAILY_CHAR_CAP?: string;
};

export function isKieloSpeechPath(pathname: string) {
  return pathname === "/api/speech" || pathname.startsWith("/api/speech/");
}

export async function handleKieloSpeech(request: Request, rawEnv: Cloudflare.Env) {
  const env = rawEnv as SpeechEnvironment;
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin);

  if (origin && !SITE_ORIGINS.has(origin)) {
    return json({ error: "origin_not_allowed" }, 403);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        ...cors,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (url.pathname === "/api/speech/status" && request.method === "GET") {
    const config = speechConfig(env);
    return json(
      {
        enabled: config.enabled,
        dailyCharacterCap: config.enabled ? config.dailyCharacterCap : 0,
        provider: config.provider,
        voices: Object.entries(VOICES).filter(([, voice]) => voice.provider === config.provider).map(([id, voice]) => ({ id, gender: voice.gender, name: voice.name })),
      },
      200,
      cors,
    );
  }

  if (url.pathname !== SPEECH_ENDPOINT) {
    return json({ error: "not_found" }, 404, cors);
  }
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, {
      ...cors,
      Allow: "POST, OPTIONS",
    });
  }

  const config = speechConfig(env);
  if (!config.enabled || !env.DB) {
    return json({ error: "neural_voice_not_configured" }, 503, cors);
  }

  const announcedLength = Number(request.headers.get("Content-Length") || "0");
  if (announcedLength > 2_048) {
    return json({ error: "request_too_large" }, 413, cors);
  }

  let body: { text?: unknown; voice?: unknown; pace?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 2_048) return json({ error: "request_too_large" }, 413, cors);
    body = JSON.parse(raw) as typeof body;
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  const text = typeof body.text === "string"
    ? body.text.normalize("NFC").replace(/\s+/gu, " ").trim()
    : "";
  const voiceId = typeof body.voice === "string" && Object.hasOwn(VOICES, body.voice)
    ? body.voice as keyof typeof VOICES
    : null;
  const voice = voiceId ? VOICES[voiceId] : null;
  const pace = body.pace === "slow" || body.pace === "steady" || body.pace === "natural"
    ? body.pace
    : null;

  if (!text || text.length > MAX_TEXT_LENGTH || /[\u0000-\u001f\u007f]/u.test(text)) {
    return json({ error: "text_must_be_1_to_180_characters" }, 400, cors);
  }
  if (!voice || voice.provider !== config.provider || !pace) {
    return json({ error: "unsupported_voice_or_pace" }, 400, cors);
  }

  const reserved = await reserveDailyCharacters(env.DB, text.length, config.dailyCharacterCap);
  if (!reserved) {
    return json(
      { error: "daily_voice_limit_reached", dailyCharacterCap: config.dailyCharacterCap },
      429,
      { ...cors, "Retry-After": secondsUntilHelsinkiMidnight() },
    );
  }

  try {
    if (config.provider === "gemini") {
      const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": config.key,
        },
        body: JSON.stringify({
          model: "gemini-3.8-flash-tts",
          input: [{
            type: "user_input",
            content: [{
              type: "text",
              text,
              annotations: [{
                type: "speech_metadata",
                style: pace === "slow"
                  ? "Speak the exact Finnish text slowly and clearly for a language learner. Do not add or translate words."
                  : pace === "natural"
                    ? "Speak the exact Finnish text naturally and clearly. Do not add or translate words."
                    : "Speak the exact Finnish text at a steady, clear pace for a language learner. Do not add or translate words.",
              }],
            }],
          }],
          response_format: { type: "audio" },
          generation_config: { speech_config: [{ voice: voice.name }] },
        }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!upstream.ok) return json({ error: "speech_provider_unavailable" }, 502, cors);
      const result = await upstream.json() as {
        output_audio?: { data?: string; mime_type?: string };
        steps?: Array<{ type?: string; content?: Array<{ type?: string; data?: string }> }>;
      };
      const audioBase64 = result.output_audio?.data || result.steps
        ?.filter((step) => step.type === "model_output")
        .flatMap((step) => step.content ?? [])
        .find((part) => part.type === "audio" && typeof part.data === "string")?.data;
      if (!audioBase64) return json({ error: "speech_provider_unavailable" }, 502, cors);
      const binary = atob(audioBase64);
      const audio = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      return audioResponse(audio, "audio/wav", cors);
    }

    const ssml = makeSsml(text, voiceId!, pace);
    const upstream = await fetch(
      `https://${config.region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "Ocp-Apim-Subscription-Key": config.key,
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
          "User-Agent": "Kielo-Finnish-Language-Learning",
        },
        body: ssml,
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (!upstream.ok || !upstream.body) {
      return json({ error: "speech_provider_unavailable" }, 502, cors);
    }
    return audioResponse(upstream.body, "audio/mpeg", cors);
  } catch {
    return json({ error: "speech_provider_unavailable" }, 502, cors);
  }
}

function speechConfig(env: SpeechEnvironment) {
  const geminiKey = env.GEMINI_API_KEY?.trim() || "";
  const key = env.AZURE_SPEECH_KEY?.trim() || "";
  const region = env.AZURE_SPEECH_REGION?.trim().toLowerCase() || "";
  const configuredCap = Number(env.KIELO_NEURAL_VOICE_DAILY_CHAR_CAP || "0");
  const dailyCharacterCap = Number.isSafeInteger(configuredCap)
    && configuredCap > 0
    && configuredCap <= DAILY_CHARACTER_HARD_LIMIT
    ? configuredCap
    : 0;
  const validRegion = /^[a-z0-9-]{2,30}$/u.test(region);
  const provider = geminiKey ? "gemini" : key && validRegion ? "azure" : null;
  return {
    key: provider === "gemini" ? geminiKey : key,
    region,
    provider,
    dailyCharacterCap,
    enabled: Boolean(provider && dailyCharacterCap && env.DB),
  };
}

async function reserveDailyCharacters(db: D1Database, characters: number, cap: number) {
  const day = helsinkiDayKey();
  const row = await db.prepare(`
    INSERT INTO speech_usage (day, characters, requests)
    VALUES (?, ?, 1)
    ON CONFLICT(day) DO UPDATE SET
      characters = speech_usage.characters + excluded.characters,
      requests = speech_usage.requests + 1
    WHERE speech_usage.characters + excluded.characters <= ?
    RETURNING characters
  `).bind(day, characters, cap).first<{ characters: number }>();
  return Boolean(row);
}

function helsinkiDayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Helsinki",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "00";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function secondsUntilHelsinkiMidnight() {
  const now = new Date();
  const local = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => Number(local.find((item) => item.type === type)?.value || 0);
  return String(Math.max(1, 86_400 - (part("hour") * 3_600 + part("minute") * 60 + part("second"))));
}

function makeSsml(text: string, voice: keyof typeof VOICES, pace: "slow" | "steady" | "natural") {
  const rate = pace === "slow" ? "-20%" : pace === "steady" ? "-8%" : "+0%";
  const safeText = text.replace(/[&<>"']/gu, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  })[character]!);
  return `<speak version="1.0" xml:lang="fi-FI"><voice name="${voice}"><prosody rate="${rate}">${safeText}</prosody></voice></speak>`;
}

function audioResponse(body: BodyInit | null, contentType: "audio/mpeg" | "audio/wav", cors: HeadersInit) {
  return new Response(body, {
    status: 200,
    headers: {
      ...cors,
      "Content-Type": contentType,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function corsHeaders(origin: string | null) {
  return {
    ...(origin && SITE_ORIGINS.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}
