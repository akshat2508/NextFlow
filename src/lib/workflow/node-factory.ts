import { generateId } from "@/lib/utils/ids";

import {
  NodeState,
  NodeType
} from "@/lib/types/node.types";

export function createCropImageNode() {
  return {
    id: generateId(),

    type: NodeType.CROP_IMAGE,

    position: {
      x: 400,
      y: 300
    },

    state: NodeState.IDLE,

    data: {
      xPercent: 0,
      yPercent: 0,
      widthPercent: 100,
      heightPercent: 100
    }
  };
}

export function createGeminiNode() {
  return {
    id: generateId(),

    type: NodeType.GEMINI_PRO,

    position: {
      x: 400,
      y: 300
    },

    state: NodeState.IDLE,

    data: {
      prompt: "",
      systemPrompt: ""
    }
  };
}