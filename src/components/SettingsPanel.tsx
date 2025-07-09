import React, { useState } from 'react';
import { Node } from '../types';
import { X, MessageSquare, HelpCircle, Settings, Circle, Play } from 'lucide-react';

interface SettingsPanelProps {
  node: Node;
  onUpdate: (node: Node) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, onUpdate, onClose }) => {
  const [localNode, setLocalNode] = useState<Node>({ ...node });

  const handleSave = () => {
    onUpdate(localNode);
  };

  const handleChange = (field: string, value: any) => {
    setLocalNode(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      }
    }));
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'start':
        return <Play size={20} className="text-green-600" />;
      case 'message':
        return <MessageSquare size={20} className="text-blue-600" />;
      case 'input':
        return <HelpCircle size={20} className="text-orange-600" />;
      case 'condition':
        return <Settings size={20} className="text-purple-600" />;
      case 'action':
        return <Circle size={20} className="text-red-600" />;
      default:
        return <Circle size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getNodeIcon()}
            <h3 className="text-lg font-semibold text-gray-900">
              {node.type.charAt(0).toUpperCase() + node.type.slice(1)} Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Settings */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            type="text"
            value={localNode.data.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter node label"
          />
        </div>

        {/* Message Node Settings */}
        {node.type === 'message' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Message Content
            </label>
            <textarea
              value={localNode.data.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your message here..."
            />
          </div>
        )}

        {/* Input Node Settings */}
        {node.type === 'input' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Input Type
            </label>
            <select
              value={localNode.data.inputType || 'text'}
              onChange={(e) => handleChange('inputType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
            </select>
            
            <label className="block text-sm font-medium text-gray-700">
              Placeholder
            </label>
            <input
              type="text"
              value={localNode.data.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter placeholder text"
            />
          </div>
        )}

        {/* Condition Node Settings */}
        {node.type === 'condition' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Condition Expression
            </label>
            <input
              type="text"
              value={localNode.data.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., user_input == 'yes'"
            />
          </div>
        )}

        {/* Action Node Settings */}
        {node.type === 'action' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Action Description
            </label>
            <textarea
              value={localNode.data.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the action to perform..."
            />
          </div>
        )}

        {/* Position Information */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">X</label>
              <input
                type="number"
                value={Math.round(localNode.position.x)}
                onChange={(e) => setLocalNode(prev => ({
                  ...prev,
                  position: { ...prev.position, x: Number(e.target.value) }
                }))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y</label>
              <input
                type="number"
                value={Math.round(localNode.position.y)}
                onChange={(e) => setLocalNode(prev => ({
                  ...prev,
                  position: { ...prev.position, y: Number(e.target.value) }
                }))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};