import { prisma } from "@/lib/db/prisma";

export class WorkflowRunRepository {
  async create(data: {
    workflowId: string;
    status: string;
    startedAt: Date;
  }) {
    return prisma.workflowRun.create({
      data
    });
  }

  async complete(
    runId: string,
    status: string
  ) {
    return prisma.workflowRun.update({
      where: {
        id: runId
      },

      data: {
        status,
        completedAt: new Date()
      }
    });
  }

  async findByWorkflow(
    workflowId: string
  ) {
    return prisma.workflowRun.findMany({
      where: {
        workflowId
      },

      include: {
        nodeRuns: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(runId: string) {
  return prisma.workflowRun.findUnique({
    where: {
      id: runId
    },

    include: {
      nodeRuns: true
    }
  });
}
}