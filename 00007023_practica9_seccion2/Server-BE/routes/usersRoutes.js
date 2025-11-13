// routes/usersRoutes.js
const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// Importar middleware → (por ahora no lo aplicamos, pero queda listo)
const { verifyToken } = require("../middlewares/auth");

// GET /users
router.get("/", getUsers);

// GET /users/:id
router.get("/:id", getUserById);

// POST /users
router.post("/", createUser);

// PUT /users/:id
router.put("/:id", updateUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

module.exports = router;
