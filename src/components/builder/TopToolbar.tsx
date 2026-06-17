"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { UserButton } from "@clerk/nextjs";

import { toast } from "sonner";

import {
  useExecutionStore,
} from "@/store/execution.store";

import {
  useWorkflowStore,
} from "@/store/workflow.store";

export function TopToolbar() {
  const [saving, setSaving] =
    useState(false);

  const [executing, setExecuting] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const {
    setLastResponse,
    setRunId,
  } = useExecutionStore();

  const {
    workflowId,
    workflowName,
    setWorkflowName,
    nodes,
    edges,
    setNodes,
    setEdges,
  } = useWorkflowStore();

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
            name: workflowName,
            nodes,
            edges,
          }),
        }
      );

      toast.success(
        "Workflow saved"
      );
    } catch {
      toast.error(
        "Failed to save workflow"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleExecute() {
    if (!workflowId) {
      return;
    }

    try {
      setExecuting(true);

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

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Execution failed"
        );
      }

      toast.success(
        "Workflow executed"
      );

      if (result.runId) {
        setRunId(
          result.runId
        );
      }

      const responseNode =
        result.nodes?.find(
          (node: any) =>
            node.nodeType ===
            "RESPONSE"
        );

      if (
        responseNode?.output
          ?.response
      ) {
        setLastResponse(
          responseNode.output
            .response
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Execution failed"
      );
    } finally {
      setExecuting(false);
    }
  }

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

    link.download =
      `${workflowName}.json`;

    link.click();

    URL.revokeObjectURL(
      url
    );

    toast.success(
      "Workflow exported"
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
          e.target
            ?.result as string;

        const workflow =
          JSON.parse(
            content
          );

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

        toast.success(
          "Workflow imported"
        );
      } catch {
        toast.error(
          "Invalid JSON file"
        );
      }
    };

    reader.readAsText(
      file
    );
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

      <div className="flex items-center gap-2">
        <button
          onClick={
            handleExport
          }
          className="
            rounded
            border
            border-zinc-700
            px-3
            py-1
          "
        >
          Export
        </button>

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="
            rounded
            border
            border-zinc-700
            px-3
            py-1
          "
        >
          Import
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={
            handleImport
          }
          className="hidden"
        />

        <button
          onClick={
            handleSave
          }
          className="
            rounded
            border
            border-zinc-700
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
            min-w-[220px]
            rounded
            border
            border-zinc-700
            bg-zinc-900
            px-3
            py-1
            text-sm
            text-white
          "
        />

        <button
          onClick={
            handleExecute
          }
          disabled={
            executing
          }
          className="
            rounded
            bg-blue-600
            px-3
            py-1
            disabled:opacity-50
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