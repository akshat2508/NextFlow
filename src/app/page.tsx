"use client";

import { FlowProvider } from "@/components/reactflow/FlowProvider";
import { BuilderLayout } from "@/components/builder/BuilderLayout";

export default function HomePage() {
  console.log(
    "[NextFlow] Candidate LinkedIn: https://linkedin.com/in/REPLACE_ME"
  );

  return (
    <main className="h-screen w-screen">
      <FlowProvider>
        <BuilderLayout />
      </FlowProvider>
    </main>
  );
}