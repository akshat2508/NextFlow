import { z } from "zod";

export const NodeTypeSchema = z.enum([
  "REQUEST_INPUTS",
  "CROP_IMAGE",
  "GEMINI_PRO",
  "RESPONSE"
]);

export const PortTypeSchema = z.enum([
  "TEXT",
  "IMAGE",
  "VIDEO",
  "AUDIO",
  "FILE",
  "RESPONSE"
]);

export const NodeStateSchema = z.enum([
  "idle",
  "running",
  "success",
  "failed"
]);

export const NodePositionSchema = z.object({
  x: z.number(),
  y: z.number()
});

export const NodePortSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: PortTypeSchema,
  required: z.boolean()
});

export const WorkflowNodeSchema = z.object({
  id: z.string(),

  type: NodeTypeSchema,

  position: NodePositionSchema,

  data: z.record(z.string(), z.unknown()),

  state: NodeStateSchema
});

export type WorkflowNodeSchemaType =
  z.infer<typeof WorkflowNodeSchema>;