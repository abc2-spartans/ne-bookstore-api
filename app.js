
const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const PORT = 5000;
const server = createServer((req, res) => {
    if (req.url === '/api/v1/books' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('[]');
    }
    else if (req.url === '/health') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const healthData = {
            status: "healthy",
            timestamp: new Date().toISOString(),
            service: "Bookstore API",
            apiURL: `http://localhost:${PORT}/api/v1/books`,
        };
        res.end(JSON.stringify(healthData));
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Welcome to Bookstore API")
    }
});
server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
