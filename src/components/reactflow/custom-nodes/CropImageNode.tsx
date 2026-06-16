"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export function CropImageNode(
  props: NodeProps
) {
  return (
    <BaseNode
      title="Crop Image"
      status={
        props.data?.state as string
      }
    >
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="X%"
          className="rounded border p-2"
        />

        <input
          placeholder="Y%"
          className="rounded border p-2"
        />

        <input
          placeholder="Width%"
          className="rounded border p-2"
        />

        <input
          placeholder="Height%"
          className="rounded border p-2"
        />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="image"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="image"
      />
    </BaseNode>
  );
}