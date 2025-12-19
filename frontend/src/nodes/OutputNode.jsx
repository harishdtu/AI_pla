import { Handle, Position } from "reactflow";

export default function OutputNode() {
  return (
    <div className="node output">
      <strong>Output</strong>
      <p>Chat Response</p>

      {/* Input handle */}
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

