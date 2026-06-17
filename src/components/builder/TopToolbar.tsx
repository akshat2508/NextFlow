"use client";

import {
  useState
} from "react";
import { useExecutionStore } from "@/store/execution.store";
import {
  useWorkflowStore
} from "@/store/workflow.store";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {toast } from "sonner";
export function TopToolbar() {
  const [saving, setSaving] =
    useState(false);
const {
  setLastResponse,
  setRunId
} = useExecutionStore();
  const {
    workflowId,
    workflowName,
    setWorkflowName,
    nodes,
    edges
  } = useWorkflowStore();
  console.log("workflowId:", workflowId);

  async function handleSave() {
    if (!workflowId) {
      return;
    }

    try {
      setSaving(true);

      await fetch(
        `/api/workflows/${workflowId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name:workflowName,
            nodes,
            edges,
          }),
        }
      );

      toast.success(
        "Workflow saved"
      );
    } 
    catch(error){
      toast.error("failed to save workflow");
    }
    finally {
      setSaving(false);
    }
  }

  const [executing, setExecuting] =
  useState(false);

async function handleExecute() {
  if (!workflowId) {
    return;
  }

  try {
    setExecuting(true);

    // Save latest canvas state first
    await fetch(
      `/api/workflows/${workflowId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: workflowName,
          nodes,
          edges,
        }),
      }
    );

    const response =
      await fetch(
        "/api/executions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            workflowId,
          }),
        }
      );

    const result =
      await response.json();
      toast.success("Workflow executed successfully");
      if (result.runId) {
  setRunId(result.runId);
}

    const responseNode =
      result.nodes?.find(
        (node: any) =>
          node.nodeType ===
          "RESPONSE"
      );

    if (
      responseNode?.output?.response
    ) {
      setLastResponse(
        responseNode.output.response
      );
    }

    console.log(
      "Execution Result",
      result
    );
  } catch (error) {
    console.error(error);

toast.error(
  error instanceof Error
    ? error.message
    : "Execution failed"
);
  } finally {
    setExecuting(false);
  }
}

  return (
    <header
      className="
      flex
      h-14
      items-center
      justify-between
      border-b
      border-zinc-800
      bg-zinc-950
      px-4
      "
    >
      <div className="flex items-center gap-4">
  <Link
    href="/"
    className="
      flex
      items-center
      gap-1
      rounded
      border
      border-zinc-700
      px-2
      py-1
      text-sm
      hover:bg-zinc-900
    "
  >
    <ArrowLeft className="h-4 w-4" />
    Dashboard
  </Link>

  <span className="font-semibold">
    NextFlow
  </span>

  <UserButton />
</div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="
          rounded
          border
          px-3
          py-1
          "
        >
          {saving
            ? "Saving..."
            : "Save"}
        </button>

       <input
  value={workflowName}
  onChange={(e) =>
    setWorkflowName(
      e.target.value
    )
  }
  placeholder="Workflow Name"
  className="
    rounded
    border
    border-zinc-700
    bg-zinc-900
    px-3
    py-1
    text-sm
    text-white
    min-w-[220px]
  "
/>

        <button
  onClick={handleExecute}
  disabled={executing}
  className="
    rounded
    bg-blue-600
    px-3
    py-1
  "
>
  {executing
    ? "Running..."
    : "Execute"}
</button>
      </div>
    </header>
  );
}