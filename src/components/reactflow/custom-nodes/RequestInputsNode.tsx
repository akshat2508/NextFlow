"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export function RequestInputsNode(
  props: NodeProps
) {
  return (
    <BaseNode
      title="Request Inputs"
      status={
        props.data?.state as string
      }
    >
      <div className="space-y-3">
       <input
  placeholder="Text Input"
  className="
    w-full
    rounded
    border
    border-slate-300
    bg-white
    p-2
    text-slate-900
    placeholder:text-slate-400
  "
/>

        <input
          type="file"
          className="w-full"
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="text"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="image"
        style={{
          top: 80
        }}
      />
    </BaseNode>
  );
}