"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";
import {
  useExecutionStore
} from "@/store/execution.store";

import { BaseNode } from "./BaseNode";

export function ResponseNode(
  props: NodeProps
) {
    const lastResponse =
  useExecutionStore(
    (state) =>
      state.lastResponse
  );
  return (
    <BaseNode
      title="Response"
      status={
        props.data?.state as string
      }
    >
      <div
  className="
  max-h-40
  overflow-auto
  rounded
  bg-slate-100
  p-2
  text-sm
  text-slate-900
  "
>
  {lastResponse ??
    "Final Output"}
</div>

      <Handle
        type="target"
        position={Position.Left}
        id="response"
      />
    </BaseNode>
  );
}