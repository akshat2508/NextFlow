"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";
import { useWorkflowStore }
from "@/store/workflow.store";

import { BaseNode } from "./BaseNode";

export function GeminiNode(
  props: NodeProps

) {

    const updateNodeData =
  useWorkflowStore(
    (state) =>
      state.updateNodeData
  );

  return (
    <BaseNode
      title="Gemini 3.1 Pro"
      status={
        props.data?.state as string
      }
    >
      <textarea
  value={
  (props.data?.prompt as string) ??
  ""
}
  onChange={(e) =>
    updateNodeData(
      props.id,
      {
        prompt:
          e.target.value
      }
    )
  }
  placeholder="Prompt"
  className="
    h-28
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

      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
      />
      {/* <Handle
  type="target"
  position={Position.Left}
  id="systemPrompt"
  style={{
    top: 50
  }}
/> */}

      <Handle
        type="target"
        position={Position.Left}
        id="image"
        style={{
          top: 80
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="response"
      />
    </BaseNode>
  );
}