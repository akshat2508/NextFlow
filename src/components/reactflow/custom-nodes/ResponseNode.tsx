"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export function ResponseNode(
  props: NodeProps
) {
  return (
    <BaseNode
      title="Response"
      status={
        props.data?.state as string
      }
    >
      <div className="text-sm text-gray-700">
        Final Output
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="response"
      />
    </BaseNode>
  );
}