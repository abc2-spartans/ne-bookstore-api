
import express from 'express';
const hostname = '127.0.0.1';
const PORT = 5000;
const app = express();

// Welcome message
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Bookstore API")
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "Bookstore API",
        apiURL: `http://localhost:${PORT}/api/v1/books`,
    });
});

// CRUD endpoints for books
app.get("/api/v1/books", (req, res) => {
    res.status(200).json([]);
});

app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
