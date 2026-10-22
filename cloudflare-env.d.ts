declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    AZURE_SPEECH_KEY?: string;
    AZURE_SPEECH_REGION?: string;
    KIELO_NEURAL_VOICE_DAILY_CHAR_CAP?: string;
  }
}
