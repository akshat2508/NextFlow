export async function executeWorkflow(
  workflowId: string,
  inputs?: {
    text?: string;
    image?: string;
  }
) {
  const response =
    await fetch(
      "/api/executions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          workflowId,
          inputs
        })
      }
    );

  if (!response.ok) {
    throw new Error(
      "Execution failed"
    );
  }

  return response.json();
}