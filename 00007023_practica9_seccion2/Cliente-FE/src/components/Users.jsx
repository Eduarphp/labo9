import { useState } from "react";

function Users({ token }) {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert("Error al cargar usuarios");
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <button onClick={loadUsers}>Ver usuarios</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
