import { z } from "zod";

export const CreateWorkflowSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(100)
  });

export const RenameWorkflowSchema =
  z.object({
    workflowId: z.string(),

    name: z
      .string()
      .trim()
      .min(1)
      .max(100)
  });

export const DeleteWorkflowSchema =
  z.object({
    workflowId: z.string()
  });

export const ExecuteWorkflowSchema =
  z.object({
    workflowId: z.string(),

    inputs: z.object({
      text: z.string().optional(),

      image: z.string().optional()
    })
  });

export const ExportWorkflowSchema =
  z.object({
    workflowId: z.string()
  });

export const ImportWorkflowSchema =
  z.object({
    workflow: z.unknown()
  });