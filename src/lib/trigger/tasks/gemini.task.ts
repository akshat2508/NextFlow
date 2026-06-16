import { task } from "@trigger.dev/sdk/v3";

import {
  GeminiTaskPayload,
  GeminiTaskResult
} from "@/lib/types/trigger.types";

import {
  generateGeminiResponse
} from "@/lib/gemini";

export const geminiTask = task({
  id: "gemini-pro-task",

  run: async (
    payload: GeminiTaskPayload
  ): Promise<GeminiTaskResult> => {
    const response =
      await generateGeminiResponse({
        prompt: payload.prompt,
        systemPrompt:
          payload.systemPrompt,
        image: payload.image,
        video: payload.video,
        audio: payload.audio,
        file: payload.file
      });

    return {
      text: response.text,
      raw: response.raw
    };
  }
});