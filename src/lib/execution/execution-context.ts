import {
  ExecutionContextEntry,
  ExecutionContextMap
} from "@/lib/types/execution.types";

import { NodeState } from "@/lib/types/node.types";

export class ExecutionContext {
  private readonly context: ExecutionContextMap =
    new Map();

  setState(
    nodeId: string,
    state: NodeState
  ): void {
    const existing =
      this.context.get(nodeId);

    this.context.set(nodeId, {
      outputs:
        existing?.outputs ?? {},
      state
    });
  }

  setOutputs(
    nodeId: string,
    outputs: Record<
      string,
      unknown
    >
  ): void {
    const existing =
      this.context.get(nodeId);

    this.context.set(nodeId, {
      outputs,
      state:
        existing?.state ??
        NodeState.IDLE
    });
  }

  getOutputs(
    nodeId: string
  ): Record<string, unknown> {
    return (
      this.context.get(nodeId)
        ?.outputs ?? {}
    );
  }

  getState(
    nodeId: string
  ): NodeState {
    return (
      this.context.get(nodeId)
        ?.state ??
      NodeState.IDLE
    );
  }

  hasNode(
    nodeId: string
  ): boolean {
    return this.context.has(nodeId);
  }

  snapshot(): ExecutionContextMap {
    return new Map(this.context);
  }

  clear(): void {
    this.context.clear();
  }
}