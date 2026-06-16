"use client";

import {
  createCropImageNode,
  createGeminiNode
} from "@/lib/workflow/node-factory";

interface Props {
  open: boolean;

  onClose: () => void;

  onSelect: (
    node: unknown
  ) => void;
}

export function NodePicker({
  open,
  onClose,
  onSelect
}: Props) {
  if (!open) {
    return null;
  }

  return (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
    "
    onClick={onClose}
  >
    <div
      className="
        relative
        w-[400px]
        rounded-xl
        bg-white
        p-6
        text-slate-900
        shadow-xl
      "
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <button
        onClick={onClose}
        className="
          absolute
          right-4
          top-4
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-900
        "
      >
        ✕
      </button>

      <h2 className="mb-4 text-xl font-semibold">
        Add Node
      </h2>

      <div className="space-y-2">
        <button
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            p-3
            text-left
            text-slate-900
            transition
            hover:bg-slate-50
          "
          onClick={() => {
            onSelect(
              createCropImageNode()
            );
            onClose();
          }}
        >
          Crop Image
        </button>

        <button
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            p-3
            text-left
            text-slate-900
            transition
            hover:bg-slate-50
          "
          onClick={() => {
            onSelect(
              createGeminiNode()
            );
            onClose();
          }}
        >
          Gemini 3.1 Pro
        </button>
      </div>
    </div>
  </div>
);
}