import { NodeState, NodeType } from "./node.types";

export interface WorkflowDefinition {
  id: string;
  name: string;

  nodes: unknown[];

  edges: unknown[];

  createdAt: string;

  updatedAt: string;
}

export interface WorkflowExecutionResult {
  runId: string;

  status: "success" | "failed";

  startedAt: Date;

  completedAt: Date;

  nodes: NodeExecutionResult[];
}

export interface NodeExecutionResult {
  nodeId: string;

  nodeType: NodeType;

  status: NodeState;

  startedAt: Date;

  completedAt: Date;

  durationMs: number;

  output?: unknown;

  error?: string;
}