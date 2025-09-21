import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { getConfig } from '../config/index.js';

const config = getConfig();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../", config.database.sqlite.database);

// Create and export the database connection
export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Initialize database tables
export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
              `CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                publishedYear INTEGER
            )`,
              (err) => {
                if (err) {
                  console.error("Error creating books table:", err);
                  reject(err);
                } else {
                  console.log("Database tables initialized");
                  resolve();
                }
              }
            );
        });
    });
};

export default {
    db,
    initDatabase
};
