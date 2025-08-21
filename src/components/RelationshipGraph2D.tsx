
import React from 'react';

interface Node {
  id: string;
  label?: string;
  group?: string;
  platform?: string;
  confidence?: number;
}

interface Link {
  source: string;
  target: string;
  weight?: number;
}

interface RelationshipGraph2DProps {
  nodes: Node[];
  links: Link[];
  onNodeClick?: (node: Node) => void;
}

const RelationshipGraph2D: React.FC<RelationshipGraph2DProps> = ({ nodes, links, onNodeClick }) => {
  return (
    <div className="p-4 border rounded-xl bg-background/50">
      <h3 className="font-bold mb-2">Relationship Graph</h3>
      <div className="mb-4">
        <h4 className="font-semibold">Nodes</h4>
        <ul>
          {nodes.map((node) => (
            <li key={node.id}>
              <button
                className="underline text-blue-600 hover:text-blue-800"
                onClick={() => onNodeClick && onNodeClick(node)}
              >
                {node.label || node.id} ({node.platform})
              </button>
              {typeof node.confidence === 'number' && (
                <span className="ml-2 text-xs text-gray-500">Confidence: {Math.round(node.confidence * 100)}%</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Links</h4>
        <ul>
          {links.map((link, idx) => (
            <li key={idx}>
              {link.source} → {link.target}
              {typeof link.weight === 'number' && (
                <span className="ml-2 text-xs text-gray-500">Weight: {Math.round(link.weight * 100)}%</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RelationshipGraph2D;