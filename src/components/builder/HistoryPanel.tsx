"use client";

import { useEffect, useState } from "react";

import { useWorkflowStore } from "@/store/workflow.store";

interface NodeRun {
  id: string;
  nodeType: string;
  status: string;
  durationMs: number;
  error?: string | null;
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
  }, [workflowId]);

  return (
    <aside
      className="
      w-[300px]
      border-l
      border-zinc-800
      bg-zinc-950
      p-4
      overflow-y-auto
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Execution History
        </h2>

        <button
          onClick={loadHistory}
          className="
          rounded
          border
          border-zinc-700
          px-2
          py-1
          text-xs
          "
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-sm text-zinc-400">
          Loading...
        </div>
      )}

      {!loading &&
        runs.length === 0 && (
          <div className="text-sm text-zinc-400">
            No runs yet.
          </div>
        )}

      <div className="space-y-3">
        {runs.map((run) => (
          <details
            key={run.id}
            className="
            rounded-lg
            border
            border-zinc-800
            p-3
            "
          >
            <summary className="cursor-pointer">
              <div className="flex items-center justify-between">
                <span>
                  {run.status.toUpperCase()}
                </span>

                <span className="text-xs text-zinc-500">
                  {new Date(
                    run.startedAt
                  ).toLocaleTimeString()}
                </span>
              </div>
            </summary>

            <div className="mt-3 space-y-2">
              {run.nodeRuns.map(
                (nodeRun) => (
                  <div
                    key={nodeRun.id}
                    className="
                    rounded
                    bg-zinc-900
                    p-2
                    text-xs
                    "
                  >
                    <div className="flex justify-between">
                      <span>
                        {
                          nodeRun.nodeType
                        }
                      </span>

                      <span>
                        {
                          nodeRun.status
                        }
                      </span>
                    </div>

                    <div className="mt-1 text-zinc-500">
                      {
                        nodeRun.durationMs
                      }
                      ms
                    </div>

                    {nodeRun.error && (
                      <div className="mt-1 text-red-400">
                        {
                          nodeRun.error
                        }
                      </div>
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