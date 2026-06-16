import { NodeType, PortType } from "@/lib/types/node.types";

export interface ResponseNodeData {
  value?: unknown;
}

export const RESPONSE_NODE = {
  type: NodeType.RESPONSE,

  deletable: false,

  inputs: [
    {
      id: "response",
      name: "Response",
      type: PortType.TEXT,
      required: false
    },
    {
      id: "text",
      name: "Text",
      type: PortType.TEXT,
      required: false
    },
    {
      id: "image",
      name: "Image",
      type: PortType.IMAGE,
      required: false
    }
  ],

  outputs: []
} as const;