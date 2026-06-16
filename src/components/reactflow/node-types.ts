import { NodeTypes } from "@xyflow/react";

import { RequestInputsNode } from "./custom-nodes/RequestInputsNode";
import { CropImageNode } from "./custom-nodes/CropImageNode";
import { GeminiNode } from "./custom-nodes/GeminiNode";
import { ResponseNode } from "./custom-nodes/ResponseNode";

export const nodeTypes: NodeTypes = {
  REQUEST_INPUTS:
    RequestInputsNode,

  CROP_IMAGE:
    CropImageNode,

  GEMINI_PRO:
    GeminiNode,

  RESPONSE:
    ResponseNode
};