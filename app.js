
import express from 'express';
const hostname = '127.0.0.1';
const PORT = 5000;
const app = express();

// Middleware
app.use(express.json());

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
    console.log(req.query)
    // Add read all books logic here
    res.status(200);
    res.json([]);
});

app.post("/api/v1/books", (req, res) => {
    console.log(req.body)
    const { title, author, published_year } = req.body;
    if (!title || !author)
        return res.status(400).json({ error: "Title and author required" });
    // Add create logic here
    res.status(201).json({ id: 1, title, author, published_year });
});

app.get("/api/v1/books/:id", (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    // Add read single book for given id logic here
    const book = {
        id,
        title: "Book 1",
        author: "Author 1",
        published_year: 2020
    }
    res.status(201).json(book);
});

app.put("/api/v1/books/:id", (req, res) => {
    const id = req.params.id;
    const { title, author, published_year } = req.body;
    // Add update logic here
    res.status(204).json({ message: "Book updated successfully" });
});


app.delete("/api/v1/books/:id", (req, res) => {
    const id = req.params.id;
    // Add delete logic here
    res.status(204).json({ message: "Book deleted successfully" });
});

app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
