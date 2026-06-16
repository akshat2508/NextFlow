export function exportWorkflow(
  workflow: unknown
) {
  return JSON.stringify(
    workflow,
    null,
    2
  );
}

export function importWorkflow(
  content: string
) {
  return JSON.parse(content);
}