export interface CropImagePayload {
  image: string;

  xPercent: number;

  yPercent: number;

  widthPercent: number;

  heightPercent: number;
}

export interface CropImageResult {
  image: string;
}

export interface GeminiTaskPayload {
  prompt?: string;

  systemPrompt?: string;

  image?: string;

  video?: string;

  audio?: string;

  file?: string;
}

export interface GeminiTaskResult {
  text: string;

  raw: unknown;
}