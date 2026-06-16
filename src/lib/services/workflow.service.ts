import { WorkflowRepository } from "@/lib/repositories/workflow.repository";

export class WorkflowService {
  private repo =
    new WorkflowRepository();

  async createWorkflow(
    clerkUserId: string,
    name: string
  ) {
    return this.repo.create({
      clerkUserId,
      name
    });
  }

  async getWorkflows(
    clerkUserId: string
  ) {
    return this.repo.findByUser(
      clerkUserId
    );
  }

  async getWorkflow(
    workflowId: string
  ) {
    return this.repo.findById(
      workflowId
    );
  }

  async renameWorkflow(
    workflowId: string,
    name: string
  ) {
    return this.repo.update(
      workflowId,
      {
        name
      }
    );
  }

  async saveWorkflow(
    workflowId: string,
    nodes: unknown,
    edges: unknown
  ) {
    return this.repo.update(
      workflowId,
      {
        nodes,
        edges
      }
    );
  }

  async deleteWorkflow(
    workflowId: string
  ) {
    return this.repo.delete(
      workflowId
    );
  }
}