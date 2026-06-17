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
      <div className="space-y-3">

  <div>
    <label
      className="
      mb-1
      block
      text-xs
      font-medium
      text-slate-600
      "
    >
      Prompt
    </label>

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
      placeholder="Enter your prompt..."
      className="
        h-28
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        p-3
        text-sm
      "
    />
  </div>

  <div
    className="
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      p-4
      text-center
      text-xs
      text-slate-500
    "
  >
  </div>

</div>

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