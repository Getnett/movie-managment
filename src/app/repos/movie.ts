import pool from "../data/data";
import { toCamelCase } from "../lib/utils";

class MoviesRepo {
  static async allMovies() {
    const { rows } = await pool.query(`SELECT * FROM movies;`);
    return toCamelCase(rows);
  }

  static async findMovieById(movieId: string) {
    const { rows } = await pool.query(`SELECT * FROM movies WHERE id = $1`, [
      movieId,
    ]);
    return toCamelCase(rows)[0];
  }

  static async create(movieData: any) {
    const { title, year, imageUrl, description, rating } = movieData;
    const { rows } = await pool.query(
      `INSERT INTO movies (title,year,image_url,description,rating) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
      [title, year, imageUrl, description, rating]
    );

    return toCamelCase(rows)[0];
  }

  static async update(movieId: string, movieData: any) {
    const { title, year, imageUrl, description, rating } = movieData;
    const { rows } = await pool.query(
      `UPDATE movies SET title=$1,year=$2,image_url=$3 ,description=$4,rating=$5 WHERE id=$6 RETURNING *; `,
      [title, year, imageUrl, description, rating, movieId]
    );

    return toCamelCase(rows)[0];
  }
}

export default MoviesRepo;
