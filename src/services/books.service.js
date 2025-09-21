import BookMongo from "../db/books.mongo.js";

/**
 * Get all books
 * @returns {Promise<Array>} Array of books
 */
export const getAllBooks = async () => {
  try {
    const books = await BookMongo.getAll();
    console.log("Service: Successfully fetched all books");
    return books;
  } catch (error) {
    console.error("Error in service getAllBooks:", error);
    throw new Error("Failed to fetch books");
  }
};

/**
 * Get a single book by ID
 * @param {string} id - Book ID
 * @returns {Promise<Object|null>} Book object or null if not found
 */
export const getBookById = async (id) => {
  try {
    const book = await BookMongo.getById(id);
    if (!book) {
      return null;
    }
    console.log("Service: Successfully fetched book by ID", id);
    return book;
  } catch (error) {
    console.error("Error in service getBookById:", error);
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
    const newBook = await BookMongo.create(bookData);
    console.log("Service: Successfully created book", newBook?._id || newBook);
    return newBook;
  } catch (error) {
    console.error("Error in service createBook:", error);
    throw new Error("Failed to create book");
  }
};

/**
 * Update a book
 * @param {string} id - Book ID
 * @param {Object} bookData - Updated book data
 * @returns {Promise<Object|null>} Updated book or null if not found
 */
export const updateBook = async (id, bookData) => {
  try {
    const existingBook = await BookMongo.getById(id);
    if (!existingBook) {
      return null;
    }
    const updatedBook = await BookMongo.update(id, bookData);
    console.log("Service: Successfully updated book", id);
    return updatedBook;
  } catch (error) {
    console.error("Error in service updateBook:", error);
    throw new Error("Failed to update book");
  }
};

/**
 * Delete a book
 * @param {string} id - Book ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteBook = async (id) => {
  try {
    const existingBook = await BookMongo.getById(id);
    if (!existingBook) {
      return false;
    }
    const result = await BookMongo.delete(id);
    if (result) {
      console.log("Service: Successfully deleted book", id);
    }
    return !!result;
  } catch (error) {
    console.error("Error in service deleteBook:", error);
    throw new Error("Failed to delete book");
  }
};
