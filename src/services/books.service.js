import Book from "../db/books.db.js";
import { notFound } from "../utils/apiResponse.js";

/**
 * Get all books
 * @returns {Promise<Array>} Array of books
 */
export const getAllBooks = async () => {
  try {
    return await Book.getAll();
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    throw new Error("Failed to fetch books");
  }
};

/**
 * Get a single book by ID
 * @param {number} id - Book ID
 * @returns {Promise<Object|null>} Book object or null if not found
 */
export const getBookById = async (id) => {
  try {
    const book = await Book.getById(id);
    if (!book) {
      return notFound("Book not found");
    }
    return book;
  } catch (error) {
    console.error("Error in getBookById:", error);
    throw new Error("Failed to fetch book");
  }
};

/**
 * Create a new book
 * @param {Object} bookData - Book data
 * @returns {Promise<Object>} Created book
 */
export const createBook = async (bookData) => {
  try {
    const newBook = await Book.create(bookData);
    return newBook;
  } catch (error) {
    console.error("Error in createBook:", error);
    throw new Error("Failed to create book");
  }
};

/**
 * Update a book
 * @param {number} id - Book ID
 * @param {Object} bookData - Updated book data
 * @returns {Promise<Object|null>} Updated book or null if not found
 */
export const updateBook = async (id, bookData) => {
  try {
    const existingBook = await Book.getById(id);
    if (!existingBook) {
      return null;
    }

    const updatedBook = await Book.update(id, bookData);
    return updatedBook;
  } catch (error) {
    console.error("Error in updateBook:", error);
    throw new Error("Failed to update book");
  }
};

/**
 * Delete a book
 * @param {number} id - Book ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteBook = async (id) => {
  try {
    const existingBook = await Book.getById(id);
    if (!existingBook) {
      return false;
    }

    const result = await Book.delete(id);
    return !!result;
  } catch (error) {
    console.error("Error in deleteBook:", error);
    throw new Error("Failed to delete book");
  }
};
