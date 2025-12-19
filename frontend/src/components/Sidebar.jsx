const components = [
  { type: "userQuery", label: "User Query" },
  { type: "knowledgeBase", label: "Knowledge Base" },
  { type: "llm", label: "LLM Engine" },
  { type: "output", label: "Output" },
];

export default function Sidebar() {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h3>Components</h3>
      {components.map(c => (
        <div
          key={c.type}
          className="sidebar-item"
          draggable
          onDragStart={(e) => onDragStart(e, c.type)}
        >
          {c.label}
        </div>
      ))}
    </aside>
  );
}