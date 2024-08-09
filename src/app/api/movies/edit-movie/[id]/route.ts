import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../data/data";
import MoviesRepo from "../../../../repos/movie";

// I need to avoid setting up database connection for every request handler
// there should a better way

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await request.json();
  await pool.connect({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    const result = await MoviesRepo.update(userId, body);
    return NextResponse.json(
      { message: "Resource update successfully", data: result },
      { status: 200 }
    );
  } finally {
    pool.close();
  }
}
