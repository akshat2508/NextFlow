import { create } from "zustand";

export interface NodeHistory {
  id: string;

  nodeId: string;

  nodeType: string;

  status: string;

  durationMs: number;

  output?: unknown;

  error?: string;
}

export interface WorkflowHistory {
  id: string;

  workflowId: string;

  status: string;

  startedAt: string;

  completedAt?: string;

  nodeRuns: NodeHistory[];
}

interface HistoryStore {
  runs: WorkflowHistory[];

  setRuns: (
    runs: WorkflowHistory[]
  ) => void;

  addRun: (
    run: WorkflowHistory
  ) => void;

  clear: () => void;
}

export const useHistoryStore =
  create<HistoryStore>(
    (set) => ({
      runs: [],

      setRuns: (runs) =>
        set({
          runs
        }),

      addRun: (run) =>
        set((state) => ({
          runs: [
            run,
            ...state.runs
          ]
        })),

      clear: () =>
        set({
          runs: []
        })
    })
  );