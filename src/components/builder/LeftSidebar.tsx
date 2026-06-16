"use client";

import { useWorkflowStore }
from "@/store/workflow.store";
import { ChangeEvent } from "react";

export function LeftSidebar() {
  const {
  workflowId,
  workflowName,
  nodes,
  edges,
  setNodes,
  setEdges,
  setWorkflowName,
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

  function handleImport(
  event: ChangeEvent<HTMLInputElement>
) {
  const file =
    event.target.files?.[0];

  if (!file) {
    return;
  }

  const reader =
    new FileReader();

  reader.onload = (
    e
  ) => {
    try {
      const content =
        e.target?.result as string;

      const workflow =
        JSON.parse(content);

      if (
        !workflow.nodes ||
        !workflow.edges
      ) {
        throw new Error(
          "Invalid workflow"
        );
      }

      setNodes(
        workflow.nodes
      );

      setEdges(
        workflow.edges
      );

      if (
        workflow.workflowName
      ) {
        setWorkflowName(
          workflow.workflowName
        );
      }

      alert(
        "Workflow imported"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Invalid JSON file"
      );
    }
  };

  reader.readAsText(file);
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

        <label
  className="
  flex
  w-full
  cursor-pointer
  items-center
  justify-center
  rounded
  border
  p-2
  "
>
  Import JSON

  <input
    type="file"
    accept=".json"
    onChange={
      handleImport
    }
    className="hidden"
  />
</label>
      </div>
    </aside>
  );
}