"use client";

import { useEffect } from "react";

import { useWorkflowStore }
from "@/store/workflow.store";

interface Props {
  workflowId: string;
}

export function WorkflowLoader({
  workflowId,
}: Props) {
  const {
    loadWorkflow,
  } = useWorkflowStore();

  useEffect(() => {
    async function load() {
      const response =
        await fetch(
          `/api/workflows/${workflowId}`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load workflow"
        );
      }

      const workflow =
        await response.json();

      loadWorkflow({
        id: workflow.id,
        name: workflow.name,
        nodes: workflow.nodes,
        edges: workflow.edges,
      });

      console.log(
        "Workflow loaded:",
        workflow.id
      );
    }

    load();
  }, [
    workflowId,
    loadWorkflow,
  ]);

  return null;
}