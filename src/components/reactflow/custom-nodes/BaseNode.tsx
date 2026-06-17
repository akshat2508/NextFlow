"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  status?: string;
  children: ReactNode;
  headerClassName?:string;
}

function getStatusClasses(
  status?: string
) {
  switch (status) {
    case "running":
      return "bg-blue-100 text-blue-700";

    case "success":
      return "bg-green-100 text-green-700";

    case "failed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function BaseNode({
  title,
  status,
  children,
  headerClassName
}: Props) {
  return (
    <div
  className={`
    min-w-[340px]
    overflow-hidden
    rounded-2xl
    border
    border-slate-200
    bg-white
    shadow-lg

    ${
      status === "running"
        ? "node-running"
        : ""
    }
  `}
>
      <div
  className={`
    flex
    items-center
    justify-between
    border-b
    px-4
    py-3
    ${headerClassName ?? ""}
  `}
>
        <h3
          className="
          text-sm
          font-semibold
          text-slate-900
          "
        >
          {title}
        </h3>

        <span
          className={`
            rounded-full
            px-2.5
            py-1
            text-xs
            font-medium
            ${getStatusClasses(
              status
            )}
          `}
        >
          {status ?? "idle"}
        </span>
      </div>

      <div className="p-4 text-slate-900">
        {children}
      </div>
    </div>
  );
}