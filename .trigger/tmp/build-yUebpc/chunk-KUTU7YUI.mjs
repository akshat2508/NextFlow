import {
  task
} from "./chunk-N7PRLJ3N.mjs";
import {
  init_esm
} from "./chunk-IPJHSP7E.mjs";

// src/lib/trigger/tasks/crop-image.task.ts
init_esm();

// src/lib/utils/promises.ts
init_esm();
async function sleep(ms) {
  await new Promise(
    (resolve) => setTimeout(resolve, ms)
  );
}

// src/lib/trigger/tasks/crop-image.task.ts
var cropImageTask = task({
  id: "crop-image-task",
  run: async (payload) => {
    await sleep(3e4);
    return {
      image: payload.image
    };
  }
});

export {
  cropImageTask
};
//# sourceMappingURL=chunk-KUTU7YUI.mjs.map
