import { z } from "zod";

export const ExecutionInputSchema = z.object({
  text: z.string().optional(),

  image: z.string().optional()
});

export const NodeRunSchema = z.object({
  nodeId: z.string(),

  nodeType: z.string(),

  status: z.enum([
    "idle",
    "running",
    "success",
    "failed"
  ]),

  startedAt: z.date(),

  completedAt: z.date(),

  durationMs: z.number(),

  output: z.unknown().optional(),

  error: z.string().optional()
});

export const WorkflowRunSchema = z.object({
  runId: z.string(),

  status: z.enum([
    "success",
    "failed"
  ]),

  startedAt: z.date(),

  completedAt: z.date(),

  nodes: z.array(NodeRunSchema)
});