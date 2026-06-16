import { WorkflowEdge } from "@/lib/schemas/edge.schema";

export function buildDependencyMap(
  nodeIds: string[],
  edges: WorkflowEdge[]
): Map<string, string[]> {
  const dependencies =
    new Map<string, string[]>();

  for (const nodeId of nodeIds) {
    dependencies.set(nodeId, []);
  }

  for (const edge of edges) {
    const current =
      dependencies.get(edge.target) ?? [];

    current.push(edge.source);

    dependencies.set(
      edge.target,
      current
    );
  }

  return dependencies;
}