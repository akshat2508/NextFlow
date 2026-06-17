import { create } from "zustand";

export type WorkflowStatus =
  | "idle"
  | "running"
  | "success"
  | "failed";

interface ExecutionStore {
  runId?: string;
  setRunId: (
    runId: string
  ) => void;

  status: WorkflowStatus;

  isExecuting: boolean;
  lastResponse? : string,
  setLastResponse: (
  response: string
) => void;

  startExecution: (
    runId?: string
  ) => void;

  finishExecution: (
    status:
      | "success"
      | "failed"
  ) => void;

  reset: () => void;
}

export const useExecutionStore =
  create<ExecutionStore>(
    (set) => ({
      runId: undefined,
      setRunId: (
        runId
      ) => set({runId}),

      status: "idle",

      isExecuting: false,

      startExecution: (
        runId
      ) =>
        set({
          runId,

          status:
            "running",

          isExecuting:
            true
        }),

      finishExecution: (
        status
      ) =>
        set({
          status,

          isExecuting:
            false
        }),

      reset: () =>
        set({
          runId:
            undefined,

          status:
            "idle",

          isExecuting:
            false
        }),
        lastResponse: undefined,

        setLastResponse : (response) => set({lastResponse: response})

    })
  );