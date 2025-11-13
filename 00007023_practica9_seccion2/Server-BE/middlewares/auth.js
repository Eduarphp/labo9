require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const parts = authHeader.split(' ');
  const token = parts.length === 2 && /^Bearer$/i.test(parts[0])
    ? parts[1]
    : parts.length === 1 ? parts[0] : null;

  if (!token) return res.status(401).json({ message: 'Formato de token inválido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = { verifyToken };
