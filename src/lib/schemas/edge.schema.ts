import { z } from "zod";

export const WorkflowEdgeSchema = z.object({
  id: z.string(),

  source: z.string(),

  target: z.string(),

  sourceHandle: z.string(),

  targetHandle: z.string()
});

export type WorkflowEdge =
  z.infer<typeof WorkflowEdgeSchema>;