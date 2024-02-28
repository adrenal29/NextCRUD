// pages/api/schools.js

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export  async function GET(req, res) {
  try {
    // Establish database connection
    // Replace connection details with your actual database connection configuration
    const { rows } = await sql`SELECT * FROM schools`;
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
