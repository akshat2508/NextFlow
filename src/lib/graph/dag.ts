import { WorkflowEdge } from "@/lib/schemas/edge.schema";

import { hasCycle } from "./cycle";

import {
  CycleDetectedError,
  InvalidConnectionError
} from "@/lib/utils/errors";

export function validateDag(
  nodeIds: string[],
  edges: WorkflowEdge[]
): void {
  for (const edge of edges) {
    if (edge.source === edge.target) {
      throw new InvalidConnectionError(
        "Self-referencing edges are not allowed"
      );
    }
  }

  if (hasCycle(nodeIds, edges)) {
    throw new CycleDetectedError();
  }
}