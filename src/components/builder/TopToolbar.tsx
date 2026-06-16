"use client";

import {
  useState
} from "react";

import {
  useWorkflowStore
} from "@/store/workflow.store";
import { UserButton } from "@clerk/nextjs";
export function TopToolbar() {
  const [saving, setSaving] =
    useState(false);

  const {
    workflowId,
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
            nodes,
            edges,
          }),
        }
      );

      console.log(
        "Workflow saved"
      );
    } finally {
      setSaving(false);
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
      <div className="font-semibold flex items-center gap-2">
        NextFlow
        <div className="">

      <UserButton/>
        </div>
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

        <button className="rounded border px-3 py-1">
          Rename
        </button>

        <button className="rounded border px-3 py-1">
          Delete
        </button>

        <button className="rounded bg-blue-600 px-3 py-1">
          Execute
        </button>
      </div>
    </header>
  );
}