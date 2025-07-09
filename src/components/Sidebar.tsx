import React from 'react';
import { MessageSquare, Play, HelpCircle, Settings, Circle } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const nodeTypes = [
    { type: 'start', label: 'Start', icon: Play, color: 'text-green-600', bgColor: 'bg-green-50' },
    { type: 'message', label: 'Message', icon: MessageSquare, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { type: 'input', label: 'Input', icon: HelpCircle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { type: 'condition', label: 'Condition', icon: Settings, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { type: 'action', label: 'Action', icon: Circle, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-600 mt-1">Drag to add nodes</p>
      </div>
      
      <div className="p-4 space-y-3">
        {nodeTypes.map(({ type, label, icon: Icon, color, bgColor }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-all duration-200 ${bgColor} hover:scale-105`}
          >
            <Icon size={20} className={color} />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Drag nodes to canvas</p>
          <p>• Click to select & edit</p>
          <p>• Connect nodes with handles</p>
          <p>• Right panel for settings</p>
        </div>
      </div>
    </div>
  );
};