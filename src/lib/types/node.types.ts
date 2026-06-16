export enum NodeType {
  REQUEST_INPUTS = "REQUEST_INPUTS",
  CROP_IMAGE = "CROP_IMAGE",
  GEMINI_PRO = "GEMINI_PRO",
  RESPONSE = "RESPONSE"
}

export enum PortType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  FILE = "FILE",
  RESPONSE = "RESPONSE"
}

export enum NodeState {
  IDLE = "idle",
  RUNNING = "running",
  SUCCESS = "success",
  FAILED = "failed"
}

export interface NodePort {
  id: string;
  name: string;
  type: PortType;
  required: boolean;
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface BaseNodeData {
  [key: string]: unknown;
}

export interface WorkflowNode<T = BaseNodeData> {
  id: string;
  type: NodeType;
  position: NodePosition;
  data: T;
  state: NodeState;
}