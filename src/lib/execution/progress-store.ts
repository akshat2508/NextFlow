type NodeStatus =
  | "idle"
  | "running"
  | "success"
  | "failed";

const progressStore =
  new Map<
    string,
    Record<string, NodeStatus>
  >();

export function initializeProgress(
  runId: string,
  nodeIds: string[]
) {
  progressStore.set(
    runId,
    Object.fromEntries(
      nodeIds.map((id) => [
        id,
        "idle"
      ])
    )
  );
}

export function updateProgress(
  runId: string,
  nodeId: string,
  status: NodeStatus
) {
  const run =
    progressStore.get(runId);

  if (!run) {
    return;
  }

  run[nodeId] = status;
}

export function getProgress(
  runId: string
) {
  return (
    progressStore.get(runId) ??
    {}
  );
}

export function clearProgress(
  runId: string
) {
  progressStore.delete(runId);
}