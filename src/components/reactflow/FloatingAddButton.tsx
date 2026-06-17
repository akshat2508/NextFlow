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
bottom-6
left-1/2

flex
h-14
w-14
-translate-x-1/2
items-center
justify-center
rounded-full
bg-white
text-black
shadow-xl
"
    >
      <Plus />
    </button>
  );
}