import { useState } from "react";

function Login({ setToken }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.token) {
        setToken("Bearer " + result.token);
        alert("Sesión iniciada correctamente");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        placeholder="Correo"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
