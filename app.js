
const express = require('express');
const hostname = '127.0.0.1';
const PORT = 5000;
const app = express();

// Welcome message
app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Welcome to Bookstore API")
});

// Health check
app.get("/health", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "Bookstore API",
        apiURL: `http://localhost:${PORT}/api/v1/books`,
    };
    res.end(JSON.stringify(healthData));
});

// CRUD endpoints for books
app.get("/api/v1/books", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('[]');
});

app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
