"use client";

import { ReactNode } from "react";

interface Props {
  title: string;

  status?: string;

  children: ReactNode;
}
export function BaseNode({
  title,
  status,
  children
}: Props) {
  return (
    <div className="min-w-[280px] rounded-xl border border-slate-300 bg-white text-slate-900 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
        <h3 className="font-medium text-slate-900">
          {title}
        </h3>

        <span className="text-xs text-slate-500">
          {status ?? "idle"}
        </span>
      </div>

      <div className="p-4 text-slate-900">
        {children}
      </div>
    </div>
  );
}