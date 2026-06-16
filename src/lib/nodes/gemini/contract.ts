import { NodeType, PortType } from "@/lib/types/node.types";

export interface GeminiNodeData {
  prompt?: string;

  systemPrompt?: string;

  image?: string;

  video?: string;

  audio?: string;

  file?: string;
}

export interface GeminiNodeOutput {
  response: string;
}

export const GEMINI_NODE = {
  type: NodeType.GEMINI_PRO,

  deletable: true,

  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      type: PortType.TEXT,
      required: false
    },
    {
      id: "systemPrompt",
      name: "System Prompt",
      type: PortType.TEXT,
      required: false
    },
    {
      id: "image",
      name: "Image",
      type: PortType.IMAGE,
      required: false
    },
    {
      id: "video",
      name: "Video",
      type: PortType.VIDEO,
      required: false
    },
    {
      id: "audio",
      name: "Audio",
      type: PortType.AUDIO,
      required: false
    },
    {
      id: "file",
      name: "File",
      type: PortType.FILE,
      required: false
    }
  ],

  outputs: [
    {
      id: "response",
      name: "Response",
      type: PortType.TEXT,
      required: false
    }
  ]
} as const;