import {
  task
} from "./chunk-PUCX4IUI.mjs";
import {
  init_esm
} from "./chunk-J3AKIAN2.mjs";

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
//# sourceMappingURL=chunk-2C7IZO3C.mjs.map
