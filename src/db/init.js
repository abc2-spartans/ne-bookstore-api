import { Pool } from "pg";
import { getConfig } from "../config/index.js";
import dotenv from "dotenv";
dotenv.config();

const config = getConfig();

// Create a new PostgreSQL pool
export const db = new Pool({
  user: config.database.postgres.user,
  host: config.database.postgres.host,
  database: config.database.postgres.database,
  password: config.database.postgres.password,
  port: config.database.postgres.port,
});

// Test the database connection
db.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// Initialize database tables
export const initDatabase = async () => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                published_year INTEGER
            )`);

    await client.query("COMMIT");
    console.log("Database tables created successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export default {
  db,
  initDatabase,
};
