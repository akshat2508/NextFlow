export async function getHistory(
  workflowId: string
) {
  const response =
    await fetch(
      `/api/history/${workflowId}`
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch history"
    );
  }

  return response.json();
}