const { pool } = require('./db');

async function initDB() {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    await pool.query(`
      INSERT INTO users (name, email, password)
      VALUES ('Jerry', 'jerry@example.com', '$2b$10$XOHI0.vg73ve9Oy73lqU5.W//tVQuqMIAKJn3n25ZA2DUF.YGm6vq')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('Tabla users creada y usuario Jerry insertado.');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  } finally {
    await pool.end();
  }
}

initDB();
