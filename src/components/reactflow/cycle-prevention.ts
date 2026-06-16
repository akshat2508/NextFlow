import {
  Connection,
  Edge
} from "@xyflow/react";

import {
  hasCycle
} from "@/lib/graph";

export function createsCycle(
  connection: Connection,
  nodes: {
    id: string;
  }[],
  edges: Edge[]
) {
  const candidateEdges = [
    ...edges,
    {
      id: crypto.randomUUID(),

      source:
        connection.source!,

      target:
        connection.target!,

      sourceHandle:
        connection.sourceHandle,

      targetHandle:
        connection.targetHandle
    }
  ];

  return hasCycle(
    nodes.map(
      (node) => node.id
    ),
    candidateEdges as never
  );
}