require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER || 'neondb_owner',
  host: process.env.PG_HOST || 'ep-curly-sound-ahcrxe5b-pooler.c-3.us-east-1.aws.neon.tech',
  database: process.env.PG_DATABASE || 'neondb',
  password: process.env.PG_PASSWORD || 'npg_WUmQdXwNZ2f6',
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  ssl: { rejectUnauthorized: false },
});

module.exports = { pool };
