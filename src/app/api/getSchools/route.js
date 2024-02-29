// pages/api/schools.js

// import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
export  async function GET(req, res) {
  try {
    // Establish database connection
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT * FROM school`);
    client.release();
    console.log(rows)
    // Return fetched data as JSON response
    return NextResponse.json(rows,{
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching schools data:', error);
    return NextResponse.json({ error: 'Failed to fetch schools data' });
  }
}
