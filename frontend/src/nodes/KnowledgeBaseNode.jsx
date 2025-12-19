import { Handle, Position } from "reactflow";

export default function KnowledgeBaseNode() {
  return (
    <div className="node">
      <strong>Knowledge Base</strong>
      <p>PDF + Embeddings</p>

      {/* Input */}
      <Handle type="target" position={Position.Left} />
      {/* Output */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

