import { z } from "zod";

export const CropImagePayloadSchema =
  z.object({
    image: z.string(),

    xPercent: z.number(),

    yPercent: z.number(),

    widthPercent: z.number(),

    heightPercent: z.number()
  });

export const CropImageResultSchema =
  z.object({
    image: z.string()
  });

export const GeminiPayloadSchema =
  z.object({
    prompt: z.string().optional(),

    systemPrompt: z.string().optional(),

    image: z.string().optional(),

    video: z.string().optional(),

    audio: z.string().optional(),

    file: z.string().optional()
  });

export const GeminiResultSchema =
  z.object({
    text: z.string(),

    raw: z.unknown()
  });