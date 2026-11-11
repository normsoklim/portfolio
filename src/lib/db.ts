import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pgPool?: Pool;
};

function createPool() {
  return new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    ssl:
      process.env.DB_SSL === "true"
        ? { rejectUnauthorized: true }
        : false,

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    statement_timeout: 10000,
  });
}

export const pool =
  globalForPg.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}
