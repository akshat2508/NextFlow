import {
  cropImageTask
} from "./chunk-KUTU7YUI.mjs";
import {
  geminiTask
} from "./chunk-3KNLR5DT.mjs";
import {
  init_esm
} from "./chunk-IPJHSP7E.mjs";

// src/lib/trigger/registry.ts
init_esm();

// src/lib/types/node.types.ts
init_esm();

// src/lib/trigger/registry.ts
var TASK_REGISTRY = {
  ["CROP_IMAGE" /* CROP_IMAGE */]: cropImageTask,
  ["GEMINI_PRO" /* GEMINI_PRO */]: geminiTask
};

export {
  TASK_REGISTRY
};
//# sourceMappingURL=chunk-D65BBUCH.mjs.map
