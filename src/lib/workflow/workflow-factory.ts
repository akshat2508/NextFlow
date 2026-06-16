import {
  REQUEST_INPUTS_NODE,
  RESPONSE_NODE
} from "./defaults";

export function createDefaultWorkflow() {
  return {
    nodes: [
      structuredClone(
        REQUEST_INPUTS_NODE
      ),

      structuredClone(
        RESPONSE_NODE
      )
    ],

    edges: []
  };
}