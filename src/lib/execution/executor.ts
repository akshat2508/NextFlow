import {
  buildDependencyMap,
  getReadyNodes,
  validateDag
} from "@/lib/graph";

import {
  WorkflowEdge
} from "@/lib/schemas/edge.schema";

import {
  NodeState,
  NodeType
} from "@/lib/types/node.types";

import {
  WorkflowExecutionResult,
  NodeExecutionResult
} from "@/lib/types/workflow.types";

import { ExecutionContext } from "./execution-context";

import {
  resolveNodeInputs
} from "./dependency-resolver";

import { runNode } from "./node-runner";

import {
  RuntimeWorkflowNode
} from "./types";

import {
  generateRunId
} from "@/lib/utils/ids";
import { executeBatch } from "./batch-executor";

export interface ExecuteWorkflowInput {
  nodes: RuntimeWorkflowNode[];

  edges: WorkflowEdge[];

  requestInputs?: {
    text?: string;

    image?: string;
  };
}

export async function executeWorkflow(
  input: ExecuteWorkflowInput
): Promise<WorkflowExecutionResult> {
  const startedAt = new Date();

  const runId = generateRunId();

  const context =
    new ExecutionContext();

  const nodeRuns:
    NodeExecutionResult[] = [];

  const nodeMap = new Map(
    input.nodes.map((node) => [
      node.id,
      node
    ])
  );

  const nodeIds =
    input.nodes.map(
      (node) => node.id
    );

  validateDag(
    nodeIds,
    input.edges
  );

  const dependencyMap =
    buildDependencyMap(
      nodeIds,
      input.edges
    );

  const remaining =
    new Set(nodeIds);

  const completed =
    new Set<string>();

  while (remaining.size > 0) {
    const readyNodes =
      getReadyNodes(
        remaining,
        completed,
        dependencyMap
      );

    if (
      readyNodes.length === 0
    ) {
      throw new Error(
        "Deadlock detected during execution"
      );
    }

    const batchResults =
  await executeBatch(
    readyNodes.map(
      (nodeId) => async () => {
        const node =
          nodeMap.get(nodeId);

        if (!node) {
          throw new Error(
            `Node not found: ${nodeId}`
          );
        }

        const nodeStart =
          new Date();

        try {
          context.setState(
            node.id,
            NodeState.RUNNING
          );

          const resolvedInputs =
            resolveNodeInputs(
              node.id,
              input.edges,
              context,
              node.data
            );

          if (
            node.type ===
            NodeType.REQUEST_INPUTS
          ) {
            resolvedInputs.text =
              input.requestInputs?.text;

            resolvedInputs.image =
              input.requestInputs?.image;
          }

          const result =
            await runNode({
              node,
              edges: input.edges,
              inputs:
                resolvedInputs
            });

          context.setOutputs(
            node.id,
            result.outputs
          );

          context.setState(
            node.id,
            NodeState.SUCCESS
          );

          const nodeEnd =
            new Date();

          nodeRuns.push({
            nodeId: node.id,
            nodeType:
              node.type as NodeType,
            status:
              NodeState.SUCCESS,
            startedAt:
              nodeStart,
            completedAt:
              nodeEnd,
            durationMs:
              nodeEnd.getTime() -
              nodeStart.getTime(),
            output:
              result.outputs
          });

          completed.add(
            node.id
          );

          remaining.delete(
            node.id
          );

          return result;
        } catch (error) {
          const nodeEnd =
            new Date();

          context.setState(
            node.id,
            NodeState.FAILED
          );

          nodeRuns.push({
            nodeId: node.id,
            nodeType:
              node.type as NodeType,
            status:
              NodeState.FAILED,
            startedAt:
              nodeStart,
            completedAt:
              nodeEnd,
            durationMs:
              nodeEnd.getTime() -
              nodeStart.getTime(),
            error:
              error instanceof Error
                ? error.message
                : "Unknown error"
          });

          throw error;
        }
      }
    )
  );
  const hasFailures =
  batchResults.some(
    (result) =>
      result.status ===
      "rejected"
  );

if (hasFailures) {
  throw new Error(
    "Workflow execution failed"
  );
}
  }

  const completedAt =
    new Date();

  return {
    runId,

    status: "success",

    startedAt,

    completedAt,

    nodes: nodeRuns.sort(
      (a, b) =>
        a.startedAt.getTime() -
        b.startedAt.getTime()
    )
  };
}