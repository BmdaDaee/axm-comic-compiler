import { useState } from "react";
import { createProject } from "./services/projects";

function App() {
  const [status, setStatus] = useState("Idle");
  const [project, setProject] = useState(null);

  async function handleCreateProject() {
    try {
      setStatus("Creating project…");
      const data = await createProject({ id: "axm-universe", name: "AxM Universe" });
      setProject(data);
      setStatus("Project created ✅");
      console.log("Project:", data);
    } catch (err) {
      setStatus("Failed ❌ (check console)");
      console.error(err);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Comic Compiler v0</h1>
      <p>AxM Internal Tool</p>

      <button onClick={handleCreateProject} style={{ padding: "0.6rem 1rem", marginTop: "1rem" }}>
        Create Project: AxM Universe
      </button>

      <p style={{ marginTop: "1rem" }}><b>Status:</b> {status}</p>

      {project && (
        <pre style={{ marginTop: "1rem", background: "#f5f5f5", padding: "1rem" }}>
{JSON.stringify(project, null, 2)}
        </pre>
      )}
    </main>
  );
}

export default App;