
import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';
import { getConfig } from './config/index.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());


const config = getConfig();

// SQLite DB setup
const __dirname = path.resolve();
const dbPath = path.join(__dirname, config.sqlite.database);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    published_year INTEGER
  )`);
});

// Welcome message
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Bookstore API")
});

// Health check
app.get(["/api/v1", "/health"], (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "Bookstore API",
        apiURL: `http://${config.app.hostname}:${config.app.port}/api/v1/books`,
    });
});

// CRUD endpoints for books
app.get("/api/v1/books", (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get("/api/v1/books/:id", (req, res) => {
    db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Book not found" });
        res.json(row);
    });
});

app.post("/api/v1/books", (req, res) => {
    const { title, author, published_year } = req.body;
    if (!title || !author)
        return res.status(400).json({ error: "Title and author required" });
    db.run(
        "INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)",
        [title, author, published_year],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, title, author, published_year });
        }
    );
});

app.put("/api/v1/books/:id", (req, res) => {
    const { title, author, published_year } = req.body;
    db.run(
        "UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?",
        [title, author, published_year, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ error: "Book not found" });
            res.json({ id: req.params.id, title, author, published_year });
        }
    );
});

app.delete("/api/v1/books/:id", (req, res) => {
    db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: "Book not found" });
        res.status(204).send();
    });
});

app.listen(config.app.port, config.app.hostname, () => {
    console.log(`Bookstore API listening at http://${config.app.hostname}:${config.app.port}`);
});
