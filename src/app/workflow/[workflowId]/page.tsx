"use client";

import { useParams } from "next/navigation";

import { FlowProvider } from "@/components/reactflow/FlowProvider";
import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { WorkflowLoader } from "@/components/builder/WorkflowLoader";

export default function WorkflowPage() {
  const params = useParams<{ workflowId: string }>();

  return (
    <main className="h-screen w-screen">
      <FlowProvider>
        <WorkflowLoader workflowId={params.workflowId} />
        <BuilderLayout />
      </FlowProvider>
    </main>
  );
}