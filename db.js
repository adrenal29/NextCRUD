import { Pool } from "@vercel/postgres";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;