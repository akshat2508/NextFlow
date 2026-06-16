import { hasCycle } from "@/lib/graph";

export function validateWorkflow(
  nodes: {
    id: string;
  }[],
  edges: {
    source: string;
    target: string;
  }[]
) {
  return !hasCycle(
    nodes.map(
      (node) => node.id
    ),
    edges as never
  );
}