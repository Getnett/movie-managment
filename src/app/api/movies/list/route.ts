import { NextResponse } from "next/server";
import pool from "../../../data/data";
import MoviesRepo from "../../../repos/movie";

export async function GET() {
  // Check caching by default
  // this should be repalce with a single connectionString
  await pool.connect({
    host: process.env.DATABASE_SERVER_DOMAIN,
    port: Number(`${process.env.DATABASE_SERVER_PORT}`), // revisit
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
  try {
    const result = await MoviesRepo.allMovies();

    const response = NextResponse.json({ data: result }, { status: 200 });
    response.headers.set("cache-control", "no-store");
    return response;
  } finally {
    pool.close();
  }
}
