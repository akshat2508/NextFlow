import { WorkflowEdge } from "@/lib/schemas/edge.schema";

import { ExecutionContext } from "./execution-context";

export interface ResolvedInputs {
  [key: string]: unknown;
}

export function resolveNodeInputs(
  nodeId: string,
  edges: WorkflowEdge[],
  context: ExecutionContext,
  localData: Record<
    string,
    unknown
  > = {}
): ResolvedInputs {
  const resolved: ResolvedInputs = {
    ...localData
  };

  const incomingEdges = edges.filter(
    (edge) => edge.target === nodeId
  );

  for (const edge of incomingEdges) {
    const sourceOutputs =
      context.getOutputs(
        edge.source
      );

    const value =
      sourceOutputs[
        edge.sourceHandle
      ];

    resolved[
      edge.targetHandle
    ] = value;
  }

  return resolved;
}