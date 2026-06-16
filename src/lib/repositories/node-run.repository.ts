import { prisma } from "@/lib/db/prisma";

export class NodeRunRepository {
  async create(data: {
    workflowRunId: string;

    nodeId: string;

    nodeType: string;

    status: string;

    durationMs: number;

    output?: unknown;

    error?: string;
  }) {
    return prisma.nodeRun.create({
      data: {
        workflowRunId:
          data.workflowRunId,

        nodeId: data.nodeId,

        nodeType: data.nodeType,

        status: data.status,

        durationMs: data.durationMs,

        output:
          data.output === undefined
            ? undefined
            : (data.output as object),

        error: data.error
      }
    });
  }
}