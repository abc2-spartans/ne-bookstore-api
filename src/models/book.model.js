import { db } from '../db/init.js';

class Book {
  static async getAll() {
    const result = await db.query("SELECT * FROM books");
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  static async create(book) {
    const { title, author, publishedYear } = book;
    const result = await db.query(
      "INSERT INTO books (title, author, publishedYear) VALUES ($1, $2, $3) RETURNING *",
      [title, author, publishedYear]
    );
    return result.rows[0];
  }

  static async update(id, book) {
    const { title, author, publishedYear } = book;
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2, publishedYear = $3 WHERE id = $4 RETURNING *",
      [title, author, publishedYear, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await db.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0] || null;
  }
}

export default Book;
