import { NodeState } from "@/lib/types/node.types";

import {
  WorkflowExecutionResult,
  NodeExecutionResult
} from "@/lib/types/workflow.types";

import {
  WorkflowRunRepository
} from "@/lib/repositories/workflow-run.repository";

import {
  NodeRunRepository
} from "@/lib/repositories/node-run.repository";

import {
  executeWorkflow
} from "@/lib/execution";

import {
  RuntimeWorkflowNode
} from "@/lib/execution/types";

import {
  WorkflowEdge
} from "@/lib/schemas/edge.schema";

export interface ExecuteWorkflowRequest {
  workflowId: string;

  nodes: RuntimeWorkflowNode[];

  edges: WorkflowEdge[];

  inputs?: {
    text?: string;

    image?: string;
  };
}

export class ExecutionService {
  private workflowRunRepository =
    new WorkflowRunRepository();

  private nodeRunRepository =
    new NodeRunRepository();

  async execute(
    request: ExecuteWorkflowRequest
  ): Promise<WorkflowExecutionResult> {
    const workflowRun =
      await this.workflowRunRepository.create(
        {
          workflowId:
            request.workflowId,

          status: "running",

          startedAt: new Date()
        }
      );

    try {
      const result =
        await executeWorkflow({
          nodes: request.nodes,

          edges: request.edges,

          requestInputs:
            request.inputs
        });

      await this.persistNodeRuns(
        workflowRun.id,
        result.nodes
      );

      await this.workflowRunRepository.complete(
        workflowRun.id,
        "success"
      );

      return result;
    } catch (error) {
      await this.workflowRunRepository.complete(
        workflowRun.id,
        "failed"
      );

      throw error;
    }
  }

  private async persistNodeRuns(
    workflowRunId: string,
    nodeRuns: NodeExecutionResult[]
  ) {
    await Promise.all(
      nodeRuns.map((nodeRun) =>
        this.nodeRunRepository.create({
          workflowRunId,

          nodeId:
            nodeRun.nodeId,

          nodeType:
            nodeRun.nodeType,

          status:
            nodeRun.status,

          durationMs:
            nodeRun.durationMs,

          output:
            nodeRun.output,

          error:
            nodeRun.error
        })
      )
    );
  }
}