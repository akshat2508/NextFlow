import { WorkflowEdge } from "@/lib/schemas/edge.schema";

export interface IncomingDependency {
  sourceNodeId: string;

  sourceHandle: string;

  targetHandle: string;
}

export function buildIncomingMap(
  edges: WorkflowEdge[]
): Map<string, IncomingDependency[]> {
  const map =
    new Map<
      string,
      IncomingDependency[]
    >();

  for (const edge of edges) {
    const existing =
      map.get(edge.target) ?? [];

    existing.push({
      sourceNodeId: edge.source,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle
    });

    map.set(edge.target, existing);
  }

  return map;
}