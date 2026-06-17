"use client";

import {
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

import {
  useWorkflowStore,
} from "@/store/workflow.store";

export function CropImageNode(
  props: NodeProps
) {
  const updateNodeData =
    useWorkflowStore(
      (state) =>
        state.updateNodeData
    );

  function updateField(
    key: string,
    value: number
  ) {
    updateNodeData(
      props.id,
      {
        [key]: value,
      }
    );
  }

  return (
    <BaseNode
      title="Crop Image"
      status={
        props.data?.state as string
      }
    >
      <div className="space-y-4">

        {/* INPUT PREVIEW */}

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
            Input Image
          </label>

          <div
            className="
              flex
              h-32
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-xs
              text-slate-500
            "
          >
            No image connected
          </div>
        </div>

        {/* X */}

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>X Position</span>

            <span>
              {Number(
                props.data?.xPercent ?? 0
              )}
              %
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={Number(
              props.data?.xPercent ?? 0
            )}
            onChange={(e) =>
              updateField(
                "xPercent",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        {/* Y */}

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>Y Position</span>

            <span>
              {Number(
                props.data?.yPercent ?? 0
              )}
              %
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={Number(
              props.data?.yPercent ?? 0
            )}
            onChange={(e) =>
              updateField(
                "yPercent",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        {/* WIDTH */}

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>Width</span>

            <span>
              {Number(
                props.data?.widthPercent ??
                  100
              )}
              %
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={100}
            value={Number(
              props.data
                ?.widthPercent ?? 100
            )}
            onChange={(e) =>
              updateField(
                "widthPercent",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        {/* HEIGHT */}

        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>Height</span>

            <span>
              {Number(
                props.data
                  ?.heightPercent ?? 100
              )}
              %
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={100}
            value={Number(
              props.data
                ?.heightPercent ?? 100
            )}
            onChange={(e) =>
              updateField(
                "heightPercent",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        {/* OUTPUT PREVIEW */}

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
            Output Preview
          </label>

          <div
            className="
              flex
              h-32
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-xs
              text-slate-500
            "
          >
            Cropped image preview
          </div>
        </div>

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