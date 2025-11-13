require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./db');

// ⬅️ IMPORTAMOS RUTAS NUEVAS
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express + PostgreSQL funcionando correctamente');
});

// Registrar usuario
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Todos los campos son requeridos' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
  }
});

// Inicio de sesión
app.post('/api/signIn', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el inicio de sesión', error: err.message });
  }
});

// Obtener usuarios protegida
app.get('/api/users', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
});

// ⬅️ AQUÍ USAMOS LA NUEVA RUTA
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
