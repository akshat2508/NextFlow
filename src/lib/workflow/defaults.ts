import {
  NodeState,
  NodeType
} from "@/lib/types/node.types";

export const REQUEST_INPUTS_NODE = {
  id: "request-inputs",

  type: NodeType.REQUEST_INPUTS,

  position: {
    x: 100,
    y: 300
  },

  state: NodeState.IDLE,

  data: {
    text: "",
    image: ""
  }
};

export const RESPONSE_NODE = {
  id: "response",

  type: NodeType.RESPONSE,

  position: {
    x: 1000,
    y: 300
  },

  state: NodeState.IDLE,

  data: {}
};