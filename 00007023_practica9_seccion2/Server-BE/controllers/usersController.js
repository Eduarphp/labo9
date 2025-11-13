// controllers/usersController.js
const { pool } = require("../db");

// GET /users  (obtener todos)
async function getUsers(req, res) {
  try {
    const result = await pool.query("SELECT id, name, email FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios", error });
  }
}

// GET /users/:id  (obtener por id)
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error });
  }
}

// POST /users  (crear)
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
}

// PUT /users/:id (actualizar)
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
}

// DELETE /users/:id
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
