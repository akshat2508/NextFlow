"use client";

import { WorkflowCanvas } from "@/components/reactflow/WorkflowCanvas";
import { LeftSidebar } from "./LeftSidebar";
import { HistoryPanel } from "./HistoryPanel";
import { TopToolbar } from "./TopToolbar";
import { BuilderInitializer }
from "./BuilderInitializer";
export function BuilderLayout() {
  return (
    <div className="h-screen flex flex-col">
        <BuilderInitializer/>
      <TopToolbar />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <div className="relative flex-1">
          <WorkflowCanvas />
        </div>

        <HistoryPanel />
      </div>
    </div>
  );
}