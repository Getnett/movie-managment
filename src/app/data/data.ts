import pg from "pg";

class Pool {
  // using the class method to connect to the database allows connection with multiple databases

  _pool: any = null; // check the type here

  connect(options: pg.PoolConfig) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1;"); // allows the pool to start connection to postgres
  }

  close() {
    if (this._pool) {
      return this._pool.end();
    }
    throw Error("Closing before creating connection");
  }

  query(sql: string, params: any = undefined) {
    return this._pool?.query(sql, params); // This will prevent SQL exploit attack
  }
}

export default new Pool();
