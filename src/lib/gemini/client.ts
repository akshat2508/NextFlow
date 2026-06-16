import {
  GoogleGenerativeAI
} from "@google/generative-ai";

import {
  GeminiGenerateRequest,
  GeminiGenerateResponse
} from "./types";

import { DEFAULT_SYSTEM_PROMPT } from "./prompts";

let singleton:
  | GoogleGenerativeAI
  | undefined;

function getGemini() {
  if (!singleton) {
    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Missing GEMINI_API_KEY"
      );
    }

    singleton =
      new GoogleGenerativeAI(apiKey);
  }

  return singleton;
}

export async function generateGeminiResponse(
  input: GeminiGenerateRequest
): Promise<GeminiGenerateResponse> {
  const client = getGemini();

  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const systemPrompt =
    input.systemPrompt ??
    DEFAULT_SYSTEM_PROMPT;

  const prompt = `
SYSTEM:
${systemPrompt}

USER:
${input.prompt ?? ""}
`;

  const result =
    await model.generateContent(prompt);

  const response =
    await result.response;

  const text = response.text();

  return {
    text,
    raw: response
  };
}