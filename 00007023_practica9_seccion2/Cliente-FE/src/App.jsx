import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const probarBackend = async () => {
    try {
      const res = await fetch("http://localhost:5000/");
      const data = await res.text();
      setMessage(data);
    } catch {
      setMessage("❌ Error al conectar con el backend");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Cliente React + Express + PostgreSQL</h1>

      <button onClick={probarBackend}>Probar conexión</button>
      <p>{message}</p>

      <hr />

      <Register />
      <hr />
      <Login setToken={setToken} />
      <hr />
      <Users token={token} />
    </div>
  );
}

export default App;
