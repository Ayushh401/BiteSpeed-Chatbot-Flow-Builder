import React from 'react';
import { Connection, Node } from '../types';

interface ConnectionLineProps {
  connection: Connection;
  nodes: Node[];
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection, nodes }) => {
  const sourceNode = nodes.find(n => n.id === connection.source);
  const targetNode = nodes.find(n => n.id === connection.target);

  if (!sourceNode || !targetNode) return null;

  const sourceX = sourceNode.position.x + 160; // node width + handle offset
  const sourceY = sourceNode.position.y + 40; // node height / 2
  const targetX = targetNode.position.x - 8; // handle offset
  const targetY = targetNode.position.y + 40;

  // Calculate control points for smooth curve
  const controlX1 = sourceX + 50;
  const controlY1 = sourceY;
  const controlX2 = targetX - 50;
  const controlY2 = targetY;

  const pathData = `M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#4F46E5"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#4F46E5"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className="drop-shadow-sm"
      />
    </svg>
  );
};