import { NextRequest, NextResponse } from "next/server";
import pool from "../../../data/data";
import MoviesRepo from "../../../repos/movie";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);
  await pool.connect({
    host: process.env.DATABASE_SERVER_DOMAIN,
    port: Number(`${process.env.DATABASE_SERVER_PORT}`), // revisit
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
  try {
    const result = await MoviesRepo.create(body);
    return NextResponse.json(
      { message: "Resource created successfully", data: result },
      { status: 201 }
    );
  } finally {
    pool.close();
  }
}
