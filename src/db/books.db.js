import { BookModel } from "../models/books.model.js";

class Book {
  static async getAll() {
    return await BookModel.findAll();
  }

  static async getById(id) {
    return await BookModel.findByPk(id);
  }

  static async create(book) {
    return await BookModel.create(book);
  }

  static async update(id, book) {
    const [updated] = await BookModel.update(book, {
      where: { id },
    });
    if (updated) {
      return await BookModel.findByPk(id);
    }
    return null;
  }

  static async delete(id) {
    const book = await BookModel.findByPk(id);
    if (book) {
      await book.destroy();
      return book;
    }
    return null;
  }
}

export default Book;
