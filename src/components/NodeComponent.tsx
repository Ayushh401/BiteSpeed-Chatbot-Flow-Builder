import React from 'react';
import { Node } from '../types';
import { MessageSquare, Play, HelpCircle, Settings, Trash2, Circle } from 'lucide-react';

interface NodeComponentProps {
  node: Node;
  selected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onDelete: () => void;
  onConnectionStart: () => void;
  onConnectionEnd: () => void;
  connecting: { nodeId: string; isSource: boolean } | null;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  selected,
  onMouseDown,
  onClick,
  onDelete,
  onConnectionStart,
  onConnectionEnd,
  connecting
}) => {
  const getNodeIcon = () => {
    switch (node.type) {
      case 'start':
        return <Play size={16} className="text-green-600" />;
      case 'message':
        return <MessageSquare size={16} className="text-blue-600" />;
      case 'input':
        return <HelpCircle size={16} className="text-orange-600" />;
      case 'condition':
        return <Settings size={16} className="text-purple-600" />;
      case 'action':
        return <Circle size={16} className="text-red-600" />;
      default:
        return <Circle size={16} className="text-gray-600" />;
    }
  };

  const getNodeColor = () => {
    switch (node.type) {
      case 'start':
        return 'border-green-300 bg-green-50';
      case 'message':
        return 'border-blue-300 bg-blue-50';
      case 'input':
        return 'border-orange-300 bg-orange-50';
      case 'condition':
        return 'border-purple-300 bg-purple-50';
      case 'action':
        return 'border-red-300 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div
      className={`absolute select-none cursor-move transition-all duration-200 ${
        selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className={`relative w-40 p-3 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow ${getNodeColor()}`}>
        {/* Connection handles */}
        <div
          className="absolute -left-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors transform -translate-y-1/2"
          onMouseDown={(e) => {
            e.stopPropagation();
            if (connecting) {
              onConnectionEnd();
            }
          }}
        />
        <div
          className="absolute -right-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors transform -translate-y-1/2"
          onMouseDown={(e) => {
            e.stopPropagation();
            onConnectionStart();
          }}
        />

        {/* Node header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getNodeIcon()}
            <span className="text-sm font-medium text-gray-700">{node.data.label}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>

        {/* Node content */}
        <div className="text-xs text-gray-600">
          {node.data.content && (
            <p className="truncate">{node.data.content}</p>
          )}
          {node.type === 'input' && (
            <p className="text-orange-600">Input: {node.data.inputType || 'text'}</p>
          )}
          {node.type === 'condition' && (
            <p className="text-purple-600">Conditions: {node.data.conditions?.length || 0}</p>
          )}
        </div>

        {/* Connection indicator */}
        {connecting && connecting.nodeId === node.id && (
          <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-lg animate-pulse" />
        )}
      </div>
    </div>
  );
};