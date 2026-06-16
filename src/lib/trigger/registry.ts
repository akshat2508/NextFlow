import { NodeType } from "@/lib/types/node.types";

import { cropImageTask } from "./tasks/crop-image.task";
import { geminiTask } from "./tasks/gemini.task";

export const TASK_REGISTRY = {
  [NodeType.CROP_IMAGE]: cropImageTask,
  [NodeType.GEMINI_PRO]: geminiTask
} as const;