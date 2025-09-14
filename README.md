# Node-Express Bookstore API

A modern RESTful API for managing books, built with Node.js, Express.js, and SQLite using ES Modules.

## 🚀 Features

- **Full CRUD Operations** - Create, Read, Update, Delete books
- **SQLite Database** - Lightweight, file-based database
- **ES Modules** - Modern JavaScript module system
- **Health Check Endpoints** - Multiple health check routes
- **JSON API** - RESTful JSON responses
- **Error Handling** - Comprehensive error responses
- **Auto-reload** - Development server with nodemon

## 📋 Prerequisites

- **Node.js** 22.x or higher
- **Yarn** 1.22.x or higher

## 🛠️ Installation

```bash
# Clone the repository
git clone git@github.com:abc2-spartans/ne-bookstore-api.git

# Navigate to project directory
cd ne-bookstore-api

# Install dependencies
yarn install
```

## 🏃‍♂️ Running the API

### Development Mode (with auto-reload)
```bash
yarn dev
```

### Production Mode
```bash
yarn start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- **GET** `/` - Welcome message
- **GET** `/health` - Health status
- **GET** `/api/v1` - API health check

**Response Example:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-28T07:54:13.123Z",
  "service": "Bookstore API",
  "apiURL": "http://localhost:5000/api/v1/books"
}
```

### Books Management

#### Get All Books
- **GET** `/api/v1/books`
- **Response:** Array of book objects

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "published_year": 1925
  }
]
```

#### Get Book by ID
- **GET** `/api/v1/books/:id`
- **Response:** Single book object or 404 if not found

#### Create New Book
- **POST** `/api/v1/books`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "published_year": 2023
}
```

**Response:** Created book with ID

#### Update Book
- **PUT** `/api/v1/books/:id`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "published_year": 2024
}
```

#### Delete Book
- **DELETE** `/api/v1/books/:id`
- **Response:** 204 No Content on success, 404 if not found

## 🗄️ Database

- **Type:** SQLite
- **File:** `bookstore.db` (auto-created)
- **Schema:**
  ```sql
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    published_year INTEGER
  );
  ```

## 📁 Project Structure

```
ne-bookstore-api/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── bookstore.db       # SQLite database (auto-created)
```

## 🔧 Technologies Used

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web framework
- **[SQLite3](https://www.sqlite.org/)** - Database
- **[Nodemon](https://nodemon.io/)** - Development auto-reload

## 🧪 Testing the API

### Using curl

**Get all books:**
```bash
curl http://localhost:5000/api/v1/books
```

**Create a book:**
```bash
curl -X POST http://localhost:5000/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","published_year":1949}'
```

**Get a specific book:**
```bash
curl http://localhost:5000/api/v1/books/1
```

**Update a book:**
```bash
curl -X PUT http://localhost:5000/api/v1/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Animal Farm","author":"George Orwell","published_year":1945}'
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:5000/api/v1/books/1
```

**Health check:**
```bash
curl http://localhost:5000/health
```

### Using Postman or Insomnia

Import the following collection or create requests manually:

1. **GET** `http://localhost:5000/api/v1/books`
2. **POST** `http://localhost:5000/api/v1/books` with JSON body
3. **GET** `http://localhost:5000/api/v1/books/1`
4. **PUT** `http://localhost:5000/api/v1/books/1` with JSON body
5. **DELETE** `http://localhost:5000/api/v1/books/1`

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- **200** - Success
- **201** - Created
- **204** - No Content (successful deletion)
- **400** - Bad Request (missing required fields)
- **404** - Not Found
- **500** - Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error description"
}
```

## 📝 Scripts

- `yarn start` - Start the production server
- `yarn dev` - Start the development server with auto-reload

## 🔒 Environment Variables

Currently, the API uses default configuration. You can extend it by adding environment variables:

```bash
PORT=5000          # Server port (default: 5000)
DB_PATH=./bookstore.db  # Database file path
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gaurav Kumar Singh**
- Email: gauravsinghaec@gmail.com
- GitHub: [@gauravsingh](https://github.com/gauravsinghaec)

## 🔗 Related Projects

This is part of a collection of bookstore APIs implemented in different technologies:
- Node.js + Express (this project)
- Python + FastAPI
- Rust + Rocket
- Java + Spring Boot
- Go + Gin
- .NET Core

---

**Happy Coding! 🚀**
