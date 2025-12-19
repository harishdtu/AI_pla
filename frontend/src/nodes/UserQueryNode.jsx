import { Handle, Position } from "reactflow";

export default function UserQueryNode() {
  return (
    <div className="node user">
      <strong>User Query</strong>
      <p>Entry point</p>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

