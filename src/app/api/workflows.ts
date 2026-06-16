export async function createWorkflow(
  name: string
) {
  const response =
    await fetch("/api/workflows", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

  if (!response.ok) {
    throw new Error(
      "Failed to create workflow"
    );
  }

  return response.json();
}

export async function saveWorkflow(
  workflowId: string,
  nodes: unknown[],
  edges: unknown[]
) {
  const response =
    await fetch(
      `/api/workflows/${workflowId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to save workflow"
    );
  }

  return response.json();
}