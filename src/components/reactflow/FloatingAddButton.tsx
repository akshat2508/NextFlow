"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export function FloatingAddButton({
  onClick
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-8
        right-8
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black
        text-white
      "
    >
      <Plus />
    </button>
  );
}