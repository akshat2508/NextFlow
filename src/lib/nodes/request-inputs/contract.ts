import { NodeType, PortType } from "@/lib/types/node.types";

export interface RequestInputsNodeData {
  text?: string;
  image?: string;
}

export const REQUEST_INPUTS_NODE = {
  type: NodeType.REQUEST_INPUTS,

  deletable: false,

  inputs: [],

  outputs: [
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
  ]
} as const;