import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
export class WorkflowRepository {
  async create(data: {
    clerkUserId: string;
    name: string;
    nodes?: any;
edges?: any;
  }) {
    return prisma.workflow.create({
      data: {
        ...data,
        nodes: data.nodes ?? [],
        edges: data.edges ?? []
      }
    });
  }

  async findById(id: string) {
    return prisma.workflow.findUnique({
      where: { id }
    });
  }

  async findByUser(
    clerkUserId: string
  ) {
    return prisma.workflow.findMany({
      where: {
        clerkUserId
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
  }

  async update(
    workflowId: string,
    data: {
  name?: string;
  nodes?: any;
  edges?: any;
  status?: string;
}
  ) {
    return prisma.workflow.update({
      where: {
        id: workflowId
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.workflow.delete({
      where: { id }
    });
  }

  async findOwnedWorkflow(
  workflowId: string,
  clerkUserId: string
) {
  return prisma.workflow.findFirst({
    where: {
      id: workflowId,
      clerkUserId
    }
  });
}
}