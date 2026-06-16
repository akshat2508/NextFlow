"use client";

export function HistoryPanel() {
  return (
    <aside
      className="
      w-[340px]
      border-l
      border-zinc-800
      bg-zinc-950
      p-4
      "
    >
      <h2 className="mb-4 text-lg font-semibold">
        Execution History
      </h2>

      <div className="text-sm text-zinc-400">
        No runs yet.
      </div>
    </aside>
  );
}