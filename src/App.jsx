import { useState } from "react";
import { writeAndReadSmokeTest } from "./services/dbTest";

function App() {
  const [status, setStatus] = useState("Idle");
  const [data, setData] = useState(null);

  async function runTest() {
    try {
      setStatus("Writing + reading…");
      const result = await writeAndReadSmokeTest();
      setData(result);
      setStatus(result ? "Success ✅ (check console + UI)" : "No data returned ❌");
      console.log("Firestore smoke test result:", result);
    } catch (err) {
      setStatus("Failed ❌ (check console)");
      console.error("Firestore smoke test error:", err);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Comic Compiler v0</h1>
      <p>AxM Internal Tool</p>

      <button onClick={runTest} style={{ padding: "0.6rem 1rem", marginTop: "1rem" }}>
        Run Firestore Smoke Test
      </button>

      <p style={{ marginTop: "1rem" }}><b>Status:</b> {status}</p>

      {data && (
        <pre style={{ marginTop: "1rem", background: "#f5f5f5", padding: "1rem" }}>
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}

export default App;