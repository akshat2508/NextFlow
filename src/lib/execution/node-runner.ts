import { NodeType } from "@/lib/types/node.types";

import {
  cropImageTask
} from "@/lib/trigger/tasks/crop-image.task";

import {
  geminiTask
} from "@/lib/trigger/tasks/gemini.task";
import {
  generateGeminiResponse
} from "@/lib/gemini";

import { sleep }
from "@/lib/utils/promises";
import {
  NodeExecutionPayload,
  NodeExecutionOutput
} from "./types";
import { tasks } from "@trigger.dev/sdk/v3";

export async function runNode(
  payload: NodeExecutionPayload
): Promise<NodeExecutionOutput> {
  const { node, inputs } = payload;

  switch (node.type) {
    case NodeType.REQUEST_INPUTS: {
      return {
        outputs: {
          text: inputs.text,
          image: inputs.image
        }
      };
    }

    case NodeType.CROP_IMAGE: {
  await sleep(30_000);

  return {
    outputs: {
      image: inputs.image
    }
  };
}

    case NodeType.GEMINI_PRO: {
     console.log("========== GEMINI INPUTS ==========");
console.log(inputs);
console.log("prompt:", inputs.prompt);
console.log("systemPrompt:", inputs.systemPrompt);
console.log("==================================");
  const response =
    await generateGeminiResponse({
      prompt: inputs.prompt
        ? String(inputs.prompt)
        : undefined,

      systemPrompt:
        inputs.systemPrompt
          ? String(
              inputs.systemPrompt
            )
          : undefined,

      image: inputs.image
        ? String(inputs.image)
        : undefined,

      video: inputs.video
        ? String(inputs.video)
        : undefined,

      audio: inputs.audio
        ? String(inputs.audio)
        : undefined,

      file: inputs.file
        ? String(inputs.file)
        : undefined
    });

  return {
    outputs: {
      response:
        response.text
    }
  };
}

    case NodeType.RESPONSE: {
      return {
        outputs: {
          response:
            inputs.response ??
            inputs.text ??
            inputs.image
        }
      };
    }

    default:
      throw new Error(
        `Unsupported node type: ${node.type}`
      );
  }
}