import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./components/Sidebar";
import ConfigPanel from "./components/ConfigPanel";
import ChatModal from "./components/ChatModal";

import UserQueryNode from "./nodes/UserQueryNode";
import KnowledgeBaseNode from "./nodes/KnowledgeBaseNode";
import LLMNode from "./nodes/LLMNode";
import OutputNode from "./nodes/OutputNode";

const nodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  output: OutputNode,
};

let id = 0;
const getId = () => `${id++}`;

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");

    const position = { x: event.clientX - 250, y: event.clientY - 100 };

    setNodes((nds) =>
      nds.concat({
        id: getId(),
        type,
        position,
        data: {},
      })
    );
  }, []);

  const validateWorkflow = () => {
    const types = nodes.map((n) => n.type);
    return (
      types.includes("userQuery") &&
      types.includes("llm") &&
      types.includes("output")
    );
  };

  return (
    <div className="layout">
      <Sidebar />

      <div
        className="canvas"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNode(node)}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        <button
          className="build-btn"
          onClick={() => validateWorkflow() && setShowChat(true)}
        >
          Build & Chat
        </button>
      </div>

      <ConfigPanel node={selectedNode} />

      {showChat && <ChatModal workflow={nodes.map((n) => n.type)} />}
    </div>
  );
}