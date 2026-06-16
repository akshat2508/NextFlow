import { NodeType, PortType } from "@/lib/types/node.types";

export interface CropImageNodeData {
  image?: string;

  xPercent: number;

  yPercent: number;

  widthPercent: number;

  heightPercent: number;
}

export interface CropImageOutput {
  image: string;
}

export const CROP_IMAGE_NODE = {
  type: NodeType.CROP_IMAGE,

  deletable: true,

  inputs: [
    {
      id: "image",
      name: "Image",
      type: PortType.IMAGE,
      required: true
    }
  ],

  outputs: [
    {
      id: "image",
      name: "Image",
      type: PortType.IMAGE,
      required: false
    }
  ]
} as const;