"use client";

import { useWorkflowStore }
from "@/store/workflow.store";

export function LeftSidebar() {
  const { workflowName } =
    useWorkflowStore();

  return (
    <aside
      className="
      w-[280px]
      border-r
      border-zinc-800
      bg-zinc-950
      p-4
      "
    >
      <h2 className="mb-4 text-lg font-semibold">
        Workflow
      </h2>

      <div className="space-y-4">
        <input
          value={workflowName}
          readOnly
          className="
          w-full
          rounded
          border
          border-zinc-700
          bg-zinc-900
          p-2
          "
        />

        <button className="w-full rounded bg-blue-600 p-2">
          Run Workflow
        </button>

        <button className="w-full rounded border p-2">
          Export JSON
        </button>

        <button className="w-full rounded border p-2">
          Import JSON
        </button>
      </div>
    </aside>
  );
}