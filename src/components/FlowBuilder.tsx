import React, { useState, useRef, useCallback } from 'react';
import { Node, Connection, FlowData } from '../types';
import { NodeComponent } from './NodeComponent';
import { Sidebar } from './Sidebar';
import { SettingsPanel } from './SettingsPanel';
import { ConnectionLine } from './ConnectionLine';
import { generateId } from '../utils/helpers';
import { Save, Play, Download, Upload } from 'lucide-react';

export const FlowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: { label: 'Start' },
      connections: []
    }
  ]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connecting, setConnecting] = useState<{ nodeId: string; isSource: boolean } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, node: Node) => {
    if (e.button !== 0) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggedNode(node);
    setDragOffset({
      x: e.clientX - rect.left - node.position.x,
      y: e.clientY - rect.top - node.position.y
    });
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedNode || !isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === draggedNode.id
          ? { ...node, position: { x: newX, y: newY } }
          : node
      )
    );
  }, [draggedNode, dragOffset, isDragging]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('application/reactflow');
    if (!nodeType) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newNode: Node = {
      id: generateId(),
      type: nodeType as any,
      position: {
        x: e.clientX - rect.left - 75,
        y: e.clientY - rect.top - 40
      },
      data: {
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        content: nodeType === 'message' ? 'Enter your message here' : ''
      },
      connections: []
    };

    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  const handleNodeDelete = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => conn.source !== nodeId && conn.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleConnectionStart = (nodeId: string) => {
    setConnecting({ nodeId, isSource: true });
  };

  const handleConnectionEnd = (nodeId: string) => {
    if (connecting && connecting.nodeId !== nodeId) {
      const newConnection: Connection = {
        id: generateId(),
        source: connecting.nodeId,
        target: nodeId
      };
      setConnections(prev => [...prev, newConnection]);
      
      setNodes(prev => prev.map(node => 
        node.id === connecting.nodeId
          ? { ...node, connections: [...node.connections, nodeId] }
          : node
      ));
    }
    setConnecting(null);
  };

  const handleSave = () => {
    const flowData: FlowData = { nodes, connections };
    localStorage.setItem('chatbot-flow', JSON.stringify(flowData));
    alert('Flow saved successfully!');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('chatbot-flow');
    if (saved) {
      const flowData: FlowData = JSON.parse(saved);
      setNodes(flowData.nodes);
      setConnections(flowData.connections);
      alert('Flow loaded successfully!');
    }
  };

  const handleExport = () => {
    const flowData: FlowData = { nodes, connections };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'chatbot-flow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Chatbot Flow Builder</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLoad}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload size={16} />
                <span>Load</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors">
                <Play size={16} />
                <span>Test</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          <div
            ref={canvasRef}
            className="flex-1 relative bg-gray-100 overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {connections.map(connection => (
              <ConnectionLine
                key={connection.id}
                connection={connection}
                nodes={nodes}
              />
            ))}
            
            {nodes.map(node => (
              <NodeComponent
                key={node.id}
                node={node}
                selected={selectedNode?.id === node.id}
                onMouseDown={(e) => handleMouseDown(e, node)}
                onClick={() => handleNodeClick(node)}
                onDelete={() => handleNodeDelete(node.id)}
                onConnectionStart={() => handleConnectionStart(node.id)}
                onConnectionEnd={() => handleConnectionEnd(node.id)}
                connecting={connecting}
              />
            ))}
          </div>

          {selectedNode && (
            <SettingsPanel
              node={selectedNode}
              onUpdate={(updatedNode) => {
                setNodes(prev => prev.map(node => 
                  node.id === updatedNode.id ? updatedNode : node
                ));
                setSelectedNode(updatedNode);
              }}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};