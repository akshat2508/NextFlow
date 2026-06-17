"use client";

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  Connection,
  Edge
  
} from "@xyflow/react";

import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useState } from "react";

import {
  useWorkflowStore
} from "@/store/workflow.store";

import {
  nodeTypes
} from "./node-types";

import {
  createsCycle
} from "./cycle-prevention";

import {
  isValidConnectionType
} from "./connection-validation";

import {
  FloatingAddButton
} from "./FloatingAddButton";

import { NodePicker } from "./NodePicker";

export function WorkflowCanvas() {
  const [open, setOpen] =
    useState(false);

  const {
    nodes,
    edges,
    setNodes,
    setEdges
  } = useWorkflowStore();

//   const onConnect = (
//     connection: Connection
//   ) => {
//     if (
//       !isValidConnectionType(
//         connection
//       )
//     ) {
//       return;
//     }

//     if (
//       createsCycle(
//         connection,
//         nodes,
//         edges
//       )
//     ) {
//       return;
//     }

//     setEdges(
//       addEdge(
//         connection,
//         edges
//       ) as Edge[]
//     );
//   };

const onConnect = (
  connection: Connection
) => {
  if (
    !isValidConnectionType(
      connection
    )
  ) {
    console.warn(
      "Invalid connection type"
    );

    return;
  }

  if (
    createsCycle(
      connection,
      nodes,
      edges
    )
  ) {
    console.warn(
      "Cycle detected"
    );

    return;
  }

  const sourceNode =
    nodes.find(
      (n) =>
        n.id ===
        connection.source
    );

  const targetNode =
    nodes.find(
      (n) =>
        n.id ===
        connection.target
    );

  if (
    targetNode?.type ===
    "REQUEST_INPUTS"
  ) {
    return;
  }

  if (
    sourceNode?.type ===
    "RESPONSE"
  ) {
    return;
  }

  setEdges(
    addEdge(
      {
        ...connection,
        animated: true,
        type: "smoothstep",
      },
      edges
    ) as Edge[]
  );
};

  return (
    <>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        deleteKeyCode={["Backspace" , "Delete"]}
     onNodesChange={(
  changes: NodeChange[]
) => {
  const filteredChanges =
    changes.filter(
      (change) => {
        if (
          change.type !==
          "remove"
        ) {
          return true;
        }

        const node =
          nodes.find(
            (n) =>
              n.id ===
              change.id
          );

        if (
          node?.type ===
            "REQUEST_INPUTS" ||
          node?.type ===
            "RESPONSE"
        ) {
          return false;
        }

        return true;
      }
    );

  const updatedNodes =
    applyNodeChanges(
      filteredChanges,
      nodes
    );

  setNodes(updatedNodes);
}}

onEdgesChange={(
  changes: EdgeChange[]
) => {
  const updatedEdges =
    applyEdgeChanges(
      changes,
      edges
    );

  setEdges(updatedEdges);
}}
        onConnect={onConnect}
      >
        <Background />

        <Controls />

        <MiniMap />
      </ReactFlow>

      <FloatingAddButton
        onClick={() =>
          setOpen(true)
        }
      />

      <NodePicker
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onSelect={(node) =>
          setNodes([
            ...nodes,
            node as never
          ])
        }
      />
    </>
  );
}