import { WorkflowEdge } from "@/lib/schemas/edge.schema";

import { CycleDetectedError } from "@/lib/utils/errors";

export function topologicalSort(
  nodeIds: string[],
  edges: WorkflowEdge[]
): string[] {
  const inDegree =
    new Map<string, number>();

  const graph =
    new Map<string, string[]>();

  for (const nodeId of nodeIds) {
    inDegree.set(nodeId, 0);

    graph.set(nodeId, []);
  }

  for (const edge of edges) {
    graph
      .get(edge.source)
      ?.push(edge.target);

    inDegree.set(
      edge.target,
      (inDegree.get(edge.target) ?? 0) +
        1
    );
  }

  const queue: string[] = [];

  for (const [nodeId, degree] of inDegree) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  const sorted: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;

    sorted.push(current);

    const neighbors =
      graph.get(current) ?? [];

    for (const neighbor of neighbors) {
      const nextDegree =
        (inDegree.get(neighbor) ?? 0) - 1;

      inDegree.set(neighbor, nextDegree);

      if (nextDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (sorted.length !== nodeIds.length) {
    throw new CycleDetectedError();
  }

  return sorted;
}