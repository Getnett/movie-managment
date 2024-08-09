import { NextRequest, NextResponse } from "next/server";
import pool from "../../../data/data";
import MoviesRepo from "../../../repos/movie";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body", body);
  await pool.connect({
    connectionString: process.env.DATABASE_URL,
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
