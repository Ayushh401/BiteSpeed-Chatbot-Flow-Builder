export interface Node {
  id: string;
  type: 'start' | 'message' | 'input' | 'condition' | 'action';
  position: { x: number; y: number };
  data: {
    label: string;
    content?: string;
    conditions?: string[];
    inputType?: 'text' | 'number' | 'email';
  };
  connections: string[];
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface FlowData {
  nodes: Node[];
  connections: Connection[];
}

export interface DragItem {
  type: string;
  id?: string;
}