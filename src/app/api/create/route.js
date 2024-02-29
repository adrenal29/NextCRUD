// pages/api/create.js
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
async function insertDataIntoDatabase(name, address,city,state,contact,image,email_id) {
  try {
    // Insert data into the database
    const { rows } = await sql`INSERT INTO school (name, address, city,state,contact,image,email_id) VALUES (${name}, ${address}, ${city},${state},${contact},${image},${email_id}) RETURNING *;`;
    return rows[0]; // Return the inserted row
  } catch (error) {
    console.error('Error inserting data:', error);
    throw new Error('Error inserting data into the database');
  }
}
export  async function POST(req, res) {
    try {
      // Extract form data from request body
      
      const { name, address, city,state,contact,image,email_id } =await req.json();
      console.log(name, address, image,contact,image,email_id);
      // Insert data into database
      const insertedRow = await insertDataIntoDatabase(name, address,city,state,contact,image,email_id);

      // Send response
      return NextResponse.json('done');
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message });
  } 
}

