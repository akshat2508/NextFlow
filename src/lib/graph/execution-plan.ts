import { WorkflowEdge } from "@/lib/schemas/edge.schema";

export interface ExecutionStage {
  level: number;

  nodeIds: string[];
}

export function buildExecutionPlan(
  nodeIds: string[],
  edges: WorkflowEdge[]
): ExecutionStage[] {
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

  const stages: ExecutionStage[] = [];

  let currentLevel = nodeIds.filter(
    (id) => (inDegree.get(id) ?? 0) === 0
  );

  let level = 0;

  while (currentLevel.length > 0) {
    stages.push({
      level,
      nodeIds: [...currentLevel]
    });

    const nextLevel: string[] = [];

    for (const nodeId of currentLevel) {
      const neighbors =
        graph.get(nodeId) ?? [];

      for (const neighbor of neighbors) {
        const degree =
          (inDegree.get(neighbor) ?? 0) - 1;

        inDegree.set(neighbor, degree);

        if (degree === 0) {
          nextLevel.push(neighbor);
        }
      }
    }

    currentLevel = nextLevel;

    level++;
  }

  return stages;
}