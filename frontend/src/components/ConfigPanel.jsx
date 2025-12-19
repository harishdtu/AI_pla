export default function ConfigPanel({ node }) {
  if (!node) {
    return (
      <div className="config">
        <h3>Configuration</h3>
        <p style={{ color: "#6b7280" }}>
          Select a node to configure its settings
        </p>
      </div>
    );
  }

  return (
    <div className="config">
      <h3>Configuration</h3>
      <p><b>Type:</b> {node.type}</p>
      <p><b>ID:</b> {node.id}</p>
      <p style={{ marginTop: "10px", fontSize: "13px", color: "#6b7280" }}>
        Configuration options will appear here
      </p>
    </div>
  );
}
