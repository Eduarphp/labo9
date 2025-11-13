import { useState } from "react";

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message || "Usuario registrado correctamente");
    } catch (err) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        placeholder="Nombre"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
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
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default Register;
