import { NodeType } from "@/lib/types/node.types";

import {
  cropImageTask
} from "@/lib/trigger/tasks/crop-image.task";

import {
  geminiTask
} from "@/lib/trigger/tasks/gemini.task";

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
      const result = await cropImageTask.triggerAndWait({
  image: String(inputs.image ?? ""),
  xPercent: Number(inputs.xPercent ?? 0),
  yPercent: Number(inputs.yPercent ?? 0),
  widthPercent: Number(inputs.widthPercent ?? 100),
  heightPercent: Number(inputs.heightPercent ?? 100)
});

      if (!result.ok) {
  throw new Error(
    `Crop image task failed: ${String(result.error)}`
  );
}

return {
  outputs: {
    image: result.output.image
  }
};
    }

    case NodeType.GEMINI_PRO: {
      const result =
        await geminiTask.triggerAndWait({
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

      if (!result.ok) {
  throw new Error(
    `Gemini task failed: ${String(result.error)}`
  );
}

return {
  outputs: {
    response: result.output.text
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