"use client";

import { useWorkflowStore }
from "@/store/workflow.store";

export function LeftSidebar() {
  const {
    workflowId,
    workflowName,
    nodes,
    edges,
  } = useWorkflowStore();

  function handleExport() {
    const workflow = {
      workflowId,
      workflowName,
      nodes,
      edges,
    };

    const blob =
      new Blob(
        [
          JSON.stringify(
            workflow,
            null,
            2
          ),
        ],
        {
          type:
            "application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download = `${workflowName}.json`;

    link.click();

    URL.revokeObjectURL(
      url
    );
  }

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

        <button
          className="
          w-full
          rounded
          bg-blue-600
          p-2
          "
        >
          Run Workflow
        </button>

        <button
          onClick={
            handleExport
          }
          className="
          w-full
          rounded
          border
          p-2
          "
        >
          Export JSON
        </button>

        <button
          className="
          w-full
          rounded
          border
          p-2
          "
        >
          Import JSON
        </button>
      </div>
    </aside>
  );
}