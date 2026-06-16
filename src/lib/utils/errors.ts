export class WorkflowError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "WorkflowError";
  }
}

export class CycleDetectedError extends Error {
  constructor() {
    super("Cycle detected in workflow");

    this.name = "CycleDetectedError";
  }
}

export class InvalidConnectionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "InvalidConnectionError";
  }
}

export class NodeExecutionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "NodeExecutionError";
  }
}