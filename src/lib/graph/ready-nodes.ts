export function getReadyNodes(
  remainingNodes: Set<string>,
  completedNodes: Set<string>,
  dependencyMap: Map<string, string[]>
): string[] {
  const ready: string[] = [];

  for (const nodeId of remainingNodes) {
    const dependencies =
      dependencyMap.get(nodeId) ?? [];

    const isReady =
      dependencies.every((dep) =>
        completedNodes.has(dep)
      );

    if (isReady) {
      ready.push(nodeId);
    }
  }

  return ready;
}