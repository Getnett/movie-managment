import pool from "../data/data";
import { toCamelCase } from "../lib/utils";

class UsersRepo {
  static async findUserByEmail(email: string) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return toCamelCase(rows)[0];
  }
}

export default UsersRepo;
