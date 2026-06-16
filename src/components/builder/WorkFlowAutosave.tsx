"use client";

import { useEffect } from "react";

import { useWorkflowStore } from "@/store/workflow.store";

export function WorkflowAutosave() {
  const {
    workflowId,
    nodes,
    edges,
  } = useWorkflowStore();

  useEffect(() => {
    if (!workflowId) {
      return;
    }

    const timer =
      setTimeout(async () => {
        try {
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
            "Autosaved"
          );
        } catch (error) {
          console.error(error);
        }
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, [
    workflowId,
    nodes,
    edges,
  ]);

  return null;
}