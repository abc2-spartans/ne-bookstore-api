import Book from "../models/books.model.js";

class BookMongo {
  static async getAll() {
    try {
      return await Book.find();
    } catch (error) {
      console.error("Mongoose error in getAll:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await Book.findById(id);
    } catch (error) {
      console.error("Mongoose error in getById:", error);
      throw error;
    }
  }

  static async create(book) {
    try {
      const newBook = new Book(book);
      return await newBook.save();
    } catch (error) {
      console.error("Mongoose error in create:", error);
      throw error;
    }
  }

  static async update(id, book) {
    try {
      return await Book.findByIdAndUpdate(id, book, { new: true });
    } catch (error) {
      console.error("Mongoose error in update:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await Book.findByIdAndDelete(id);
    } catch (error) {
      console.error("Mongoose error in delete:", error);
      throw error;
    }
  }
}

export default BookMongo;
