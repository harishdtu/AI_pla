import { Handle, Position } from "reactflow";

export default function LLMNode() {
  return (
    <div className="node">
      <strong>LLM Engine</strong>
      <p>OpenAI / Gemini</p>

      {/* Input */}
      <Handle type="target" position={Position.Left} />
      {/* Output */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
