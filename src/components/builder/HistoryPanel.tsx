"use client";

import { useEffect, useState } from "react";

import { useWorkflowStore } from "@/store/workflow.store";
import { useExecutionStore } from "@/store/execution.store";
import {
  ChevronRight,
  ChevronDown
} from "lucide-react";
interface NodeRun {
  id: string;
  nodeType: string;
  status: string;
  durationMs: number;
  error?: string | null;
  output?: any;
}

interface WorkflowRun {
  id: string;
  status: string;
  startedAt: string;
  completedAt?: string | null;
  nodeRuns: NodeRun[];
}

export function HistoryPanel() {
  const { workflowId } =
    useWorkflowStore();

  const runId =
    useExecutionStore(
      (state) => state.runId
    );

  const [runs, setRuns] =
    useState<WorkflowRun[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function loadHistory() {
    if (!workflowId) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/history/${workflowId}`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load history"
        );
      }

      const data =
        await response.json();

      setRuns(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, [workflowId, runId]);

  return (
    <aside
      className="
      w-[360px]
      border-l
      border-slate-200
      bg-white
      p-5
      overflow-y-auto
      "
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Execution History
          </h2>

          <p className="text-sm text-slate-500">
            {runs.length} workflow runs
          </p>
        </div>

        <button
          onClick={loadHistory}
          className="
          rounded-xl
          border
          border-black
          bg-white
          text-black
          px-3
          py-1.5
          text-xs
          font-medium
          hover:bg-slate-50
          "
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-sm text-slate-500">
          Loading...
        </div>
      )}

      {!loading &&
        runs.length === 0 && (
          <div className="text-sm text-slate-500">
            No executions yet.
          </div>
        )}

      <div className="space-y-4">
        {runs.map((run) => (
          <details
            key={run.id}
            open
            className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            "
          >
<summary
  className="
  flex
  items-center
  justify-between
  cursor-pointer
  list-none
  gap-3
  "
>             <div className="flex items-center gap-3">
  <ChevronRight
    className="
    h-5
    w-5
    text-slate-500
    transition-transform
    group-open:rotate-90
    "
  />

  <span
    className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      uppercase
      tracking-wide

      ${
        run.status === "success"
          ? "bg-green-100 text-green-700"
          : run.status === "failed"
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700"
      }
    `}
  >
    {run.status}
  </span>
</div>

<span className="text-sm text-slate-500">
  {new Date(run.startedAt).toLocaleTimeString()}
</span>
            </summary>

            <div className="mt-4 space-y-3">
              {run.nodeRuns.map(
                (nodeRun) => (
                  <div
                    key={nodeRun.id}
                    className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-3
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="
                        font-semibold
                        text-slate-900
                        tracking-wide
                        "
                      >
                        {nodeRun.nodeType.replaceAll(
                          "_",
                          " "
                        )}
                      </span>

                      <span
                        className={`
                        text-xs
                        font-medium

                        ${
                          nodeRun.status ===
                          "success"
                            ? "text-green-600"
                            : nodeRun.status ===
                              "failed"
                            ? "text-red-600"
                            : "text-blue-600"
                        }
                      `}
                      >
                        {nodeRun.status}
                      </span>
                    </div>

                    <div
                      className="
                      mb-4
                      inline-flex
                      rounded-full
                      bg-slate-200
                      px-2
                      py-2
                      text-[11px]
                      font-medium
                      text-slate-600
                      "
                    >
                      {nodeRun.durationMs}
                      ms
                    </div>

                    {nodeRun.error && (
                      <div
                        className="
                        mt-3
                        rounded-lg
                        bg-red-50
                        p-2
                        text-xs
                        text-red-600
                        "
                      >
                        {nodeRun.error}
                      </div>
                    )}

                    {nodeRun.output && (
<details
  className="
  group
  rounded-2xl
  border
  border-slate-200
  bg-white
  p-4
  shadow-sm
  "
>                        <summary
                          className="
                          cursor-pointer
                          text-xs
                          font-medium
                          text-violet-600
                          hover:text-violet-700
                          "
                        >
                          View Output
                        </summary>

                        <pre
                          className="
                          mt-2
                          max-h-48
                          overflow-auto
                          rounded-xl
                          bg-slate-900
                          p-3
                          text-[10px]
                          text-slate-100
                          whitespace-pre-wrap
                          break-words
                          "
                        >
                          {JSON.stringify(
                            nodeRun.output,
                            null,
                            2
                          )}
                        </pre>
                      </details>
                    )}
                  </div>
                )
              )}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
}