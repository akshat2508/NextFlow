import { v4 as uuid } from "uuid";

export function generateId(): string {
  return uuid();
}

export function generateRunId(): string {
  return `run_${uuid()}`;
}

export function generateNodeRunId(): string {
  return `node_${uuid()}`;
}