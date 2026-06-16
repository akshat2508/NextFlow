import { WorkflowEdge } from "@/lib/schemas/edge.schema";

export interface RuntimeWorkflowNode {
  id: string;

  type: string;

  data: Record<
    string,
    unknown
  >;
}

export interface NodeExecutionPayload {
  node: RuntimeWorkflowNode;

  edges: WorkflowEdge[];

  inputs: Record<
    string,
    unknown
  >;
}

export interface NodeExecutionOutput {
  outputs: Record<
    string,
    unknown
  >;
}