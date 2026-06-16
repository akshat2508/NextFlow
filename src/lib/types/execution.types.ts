import { NodeState, NodeType } from "./node.types";

export interface ExecutionContextEntry {
  outputs: Record<string, unknown>;

  state: NodeState;
}

export type ExecutionContextMap = Map<
  string,
  ExecutionContextEntry
>;

export interface NodeDependency {
  nodeId: string;

  dependsOn: string[];
}

export interface ExecutionQueueNode {
  nodeId: string;

  nodeType: NodeType;

  dependencies: string[];
}

export interface RuntimeNodeResult {
  nodeId: string;

  state: NodeState;

  output?: unknown;

  error?: string;
}