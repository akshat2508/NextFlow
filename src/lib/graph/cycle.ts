import { WorkflowEdge } from "@/lib/schemas/edge.schema";

export function hasCycle(
  nodeIds: string[],
  edges: WorkflowEdge[]
): boolean {
  const graph = new Map<string, string[]>();

  for (const nodeId of nodeIds) {
    graph.set(nodeId, []);
  }

  for (const edge of edges) {
    graph.get(edge.source)?.push(edge.target);
  }

  const visited = new Set<string>();

  const recursionStack = new Set<string>();

  const dfs = (node: string): boolean => {
    visited.add(node);

    recursionStack.add(node);

    const neighbors =
      graph.get(node) ?? [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      } else if (
        recursionStack.has(neighbor)
      ) {
        return true;
      }
    }

    recursionStack.delete(node);

    return false;
  };

  for (const node of nodeIds) {
    if (!visited.has(node)) {
      if (dfs(node)) {
        return true;
      }
    }
  }

  return false;
}