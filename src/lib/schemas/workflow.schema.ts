import { z } from "zod";

import { WorkflowNodeSchema } from "./node.schema";
import { WorkflowEdgeSchema } from "./edge.schema";

export const WorkflowSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .trim()
    .min(1)
    .max(100),

  nodes: z.array(WorkflowNodeSchema),

  edges: z.array(WorkflowEdgeSchema),

  createdAt: z.string(),

  updatedAt: z.string()
});

export type WorkflowSchemaType =
  z.infer<typeof WorkflowSchema>;