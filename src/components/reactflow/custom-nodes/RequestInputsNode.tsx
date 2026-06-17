"use client";

import {
  Handle,
  Position,
  NodeProps
} from "@xyflow/react";
import { useRef } from "react";
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

    const fileInputRef =
  useRef<HTMLInputElement>(
    null
  );


  return (
    <BaseNode
      title="Request Inputs"
      headerClassName="bg-emerald-50"
      status={
        props.data?.state as string
      }
    >
      <div className="space-y-3 text-slate-900">
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

      <div className="space-y-2">

  {props.data?.imageUrl ? (
    <img
      src={
        props.data.imageUrl as string
      }
      alt="preview"
      className="
        h-32
        w-full
        rounded-xl
        border
        object-cover
      "
    />
  ) : (
    <div
  onClick={() =>
    fileInputRef.current?.click()
  }
  className="
    flex
    h-32
    cursor-pointer
    items-center
    justify-center
    rounded-xl
    border-2
    border-dashed
    border-slate-300
    bg-slate-50
    text-sm
    text-slate-500
    transition
    hover:border-blue-400
    hover:bg-blue-50
  "
>
      Upload Image
    </div>
  )}

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl =
      URL.createObjectURL(
        file
      );

    updateNodeData(
      props.id,
      {
        imageUrl,
      }
    );
  }}
/>

</div>
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
    </BaseNode >
  );
}