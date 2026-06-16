import { NodeType, PortType } from "@/lib/types/node.types";

export const NODE_LABELS: Record<NodeType, string> = {
  [NodeType.REQUEST_INPUTS]: "Request Inputs",
  [NodeType.CROP_IMAGE]: "Crop Image",
  [NodeType.GEMINI_PRO]: "Gemini 3.1 Pro",
  [NodeType.RESPONSE]: "Response"
};

export const NODE_COLORS: Record<NodeType, string> = {
  [NodeType.REQUEST_INPUTS]: "#22c55e",
  [NodeType.CROP_IMAGE]: "#3b82f6",
  [NodeType.GEMINI_PRO]: "#8b5cf6",
  [NodeType.RESPONSE]: "#f59e0b"
};

export const CONNECTION_COMPATIBILITY: Record<
  PortType,
  PortType[]
> = {
  [PortType.TEXT]: [PortType.TEXT],
  [PortType.IMAGE]: [PortType.IMAGE],
  [PortType.VIDEO]: [PortType.VIDEO],
  [PortType.AUDIO]: [PortType.AUDIO],
  [PortType.FILE]: [PortType.FILE],
  [PortType.RESPONSE]: [PortType.RESPONSE]
};