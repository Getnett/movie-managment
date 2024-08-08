/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE users(
             id SERIAL PRIMARY KEY,
             email VARCHAR(40) NOT NULL UNIQUE,
             password VARCHAR(300) NOT NULL
    );`);

  pgm.sql(`INSERT INTO users (email,password) VALUES ('test@mail.com','$2b$10$5niHcYgnRdR4qDLQdEykmeBDrNx3.3qYz2QYvKdtOdpVfGCPdil4W');
`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DROP TABLE users;`);
};
