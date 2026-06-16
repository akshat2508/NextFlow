"use client";

import { useEffect } from "react";

import { useWorkflowStore } from "@/store/workflow.store";

export function BuilderInitializer() {
  const {
    workflowId,
    workflowName,
    setWorkflowId,
  } = useWorkflowStore();

  useEffect(() => {
    if (workflowId) {
      return;
    }

async function init() {
  try {
    console.log("Creating workflow...");

    const response =
      await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: workflowName,
        }),
      });

    console.log(
      "Status:",
      response.status
    );

    const data =
      await response.json();

    console.log(
      "Response:",
      data
    );

    if (!response.ok) {
      throw new Error(
        JSON.stringify(data)
      );
    }

    setWorkflowId(data.id);

    console.log(
      "Workflow ID:",
      data.id
    );
  } catch (error) {
    console.error(error);
  }
}

    init();
  }, [
    workflowId,
    workflowName,
    setWorkflowId,
  ]);

  return null;
}