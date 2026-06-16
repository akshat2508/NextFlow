import { create } from "zustand";

import {
  Node,
  Edge
} from "@xyflow/react";

import {
  createDefaultWorkflow
} from "@/lib/workflow/workflow-factory";

interface WorkflowStore {
  workflowId?: string;

  workflowName: string;

  nodes: Node[];

  edges: Edge[];

  setWorkflowId: (
    id: string
  ) => void;

  setWorkflowName: (
    name: string
  ) => void;

  setNodes: (
    nodes: Node[]
  ) => void;

  setEdges: (
    edges: Edge[]
  ) => void;

  loadWorkflow: (
    workflow: {
      id: string;
      name: string;
      nodes: Node[];
      edges: Edge[];
    }
  ) => void;

  reset: () => void;
}

const initial =
  createDefaultWorkflow();

export const useWorkflowStore =
  create<WorkflowStore>(
    (set) => ({
      workflowName:
        "Untitled Workflow",

      workflowId:
        undefined,

      nodes:
        initial.nodes as Node[],

      edges:
        initial.edges as Edge[],

      setWorkflowId: (
        workflowId
      ) =>
        set({
          workflowId
        }),

      setWorkflowName: (
        workflowName
      ) =>
        set({
          workflowName
        }),

      setNodes: (nodes) =>
        set({
          nodes
        }),

      setEdges: (edges) =>
        set({
          edges
        }),

      loadWorkflow: (
        workflow
      ) =>
        set({
          workflowId:
            workflow.id,

          workflowName:
            workflow.name,

          nodes:
            workflow.nodes,

          edges:
            workflow.edges,
        }),

      reset: () =>
        set({
          workflowId:
            undefined,

          workflowName:
            "Untitled Workflow",

          nodes:
            createDefaultWorkflow()
              .nodes as Node[],

          edges:
            createDefaultWorkflow()
              .edges as Edge[]
        })
    })
  );