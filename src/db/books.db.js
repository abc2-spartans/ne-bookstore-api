import { BookModel } from "../models/books.model.js";

class Book {
  static async getAll() {
    return await BookModel.findAll();
  }

  static async getById(id) {
    return await Book.findByPk(id);
  }

  static async create(book) {
    return await Book.create(book);
  }

  static async update(id, book) {
    const [updated] = await Book.update(book, {
      where: { id },
    });
    if (updated) {
      return await Book.findByPk(id);
    }
    return null;
  }

  static async delete(id) {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      return book;
    }
    return null;
  }
}

export default Book;
