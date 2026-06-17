"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

import {
  useWorkflowStore
} from "@/store/workflow.store";

export function RequestInputsNode(
  props: NodeProps
) {
  const updateNodeData =
    useWorkflowStore(
      (state) =>
        state.updateNodeData
    );
    console.log("REQUEST NODE RENDER");
console.log(props.data);

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
  value={String(props.data?.text ?? "")}
  onChange={(e) =>
    updateNodeData(
      props.id,
      {
        text: e.target.value
      }
    )
  }
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