import { Pool } from "pg";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: true }
      : false,
});

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const directory = path.join(
      process.cwd(),
      "database",
      "migrations"
    );

    const files = (await readdir(directory))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const existing = await client.query(
        `SELECT id FROM schema_migrations
         WHERE migration_name = $1`,
        [file]
      );

      if (existing.rowCount) {
        console.log(`Already executed: ${file}`);
        continue;
      }

      const sql = await readFile(
        path.join(directory, file),
        "utf8"
      );

      await client.query("BEGIN");

      try {
        await client.query(sql);

        await client.query(
          `INSERT INTO schema_migrations (migration_name)
           VALUES ($1)`,
          [file]
        );

        await client.query("COMMIT");

        console.log(`Migration completed: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exitCode = 1;
});
