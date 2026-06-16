export interface GeminiGenerateRequest {
  prompt?: string;

  systemPrompt?: string;

  image?: string;

  video?: string;

  audio?: string;

  file?: string;
}

export interface GeminiGenerateResponse {
  text: string;

  raw: unknown;
}