import { NodeType } from "@/lib/types/node.types";

export const EXECUTABLE_NODES = [
  NodeType.REQUEST_INPUTS,
  NodeType.CROP_IMAGE,
  NodeType.GEMINI_PRO,
  NodeType.RESPONSE
] as const;