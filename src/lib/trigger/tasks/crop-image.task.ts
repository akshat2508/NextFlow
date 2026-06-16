import { task } from "@trigger.dev/sdk/v3";

import {
  CropImagePayload,
  CropImageResult
} from "@/lib/types/trigger.types";

import { sleep } from "@/lib/utils/promises";

export const cropImageTask = task({
  id: "crop-image-task",

  run: async (
    payload: CropImagePayload
  ): Promise<CropImageResult> => {
    await sleep(30_000);

    return {
      image: payload.image
    };
  }
});