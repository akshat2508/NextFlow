"use client";

import {
  useAuth,
  SignInButton,
} from "@clerk/nextjs";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

interface Workflow {
  id: string;
  name: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const {
    isLoaded,
    isSignedIn,
  } = useAuth();

  const router =
    useRouter();

  const [
    workflows,
    setWorkflows,
  ] = useState<Workflow[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadWorkflows() {
    try {
      const response =
        await fetch(
          "/api/workflows"
        );

      const data =
        await response.json();

      setWorkflows(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createWorkflow() {
    try {
      const response =
        await fetch(
          "/api/workflows",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name: "Untitled Workflow",
            }),
          }
        );

      const workflow =
        await response.json();

      router.push(
        `/workflow/${workflow.id}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteWorkflow(
    workflowId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete workflow?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await fetch(
        `/api/workflows/${workflowId}`,
        {
          method: "DELETE",
        }
      );

      setWorkflows((current) =>
        current.filter(
          (workflow) =>
            workflow.id !==
            workflowId
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      loadWorkflows();
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SignInButton />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          NextFlow Dashboard
        </h1>

        <button
          onClick={
            createWorkflow
          }
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            font-medium
            hover:bg-blue-500
          "
        >
          + New Workflow
        </button>
      </div>

      {loading ? (
        <div>
          Loading workflows...
        </div>
      ) : workflows.length ===
        0 ? (
        <div className="rounded-lg border border-zinc-800 p-8 text-zinc-400">
          No workflows yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workflows.map(
            (workflow) => (
              <div
                key={
                  workflow.id
                }
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900
                  p-4
                "
              >
                <h2 className="mb-2 text-lg font-semibold">
                  {
                    workflow.name
                  }
                </h2>

                <p className="mb-4 text-sm text-zinc-400">
                  Updated{" "}
                  {new Date(
                    workflow.updatedAt
                  ).toLocaleString()}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      router.push(
                        `/workflow/${workflow.id}`
                      )
                    }
                    className="
                      rounded
                      bg-blue-600
                      px-3
                      py-1
                      text-sm
                    "
                  >
                    Open
                  </button>

                  <button
                    onClick={() =>
                      deleteWorkflow(
                        workflow.id
                      )
                    }
                    className="
                      rounded
                      border
                      border-red-700
                      px-3
                      py-1
                      text-sm
                      text-red-400
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}