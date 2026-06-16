"use client";

import {
  ReactFlowProvider
} from "@xyflow/react";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function FlowProvider({
  children
}: Props) {
  return (
    <ReactFlowProvider>
      {children}
    </ReactFlowProvider>
  );
}