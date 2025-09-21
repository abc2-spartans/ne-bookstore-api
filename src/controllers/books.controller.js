import * as bookService from '../services/books.service.js';
import { success, created, notFound, badRequest, serverError } from '../utils/apiResponse.js';

/**
 * Get all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks(res);
        success(res, books, 'Books retrieved successfully');
    } catch (error) {
        serverError(res, error);
    }
};

/**
 * Get a single book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getBook = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id, res);
    if (!book) {
      return notFound(res, "Book not found");
    }
    success(res, book, "Book retrieved successfully");
  } catch (error) {
    serverError(res, error);
  }
};

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author) {
      return badRequest(res, "Title and author are required");
    }

    const newBook = await bookService.createBook(
      { title, author, publishedYear },
      res
    );
    created(res, "Book created successfully", newBook);
  } catch (error) {
    badRequest(res, error.message);
  }
};

/**
 * Update a book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    if (!title || !author) {
      return badRequest(res, "Title and author are required");
    }

    const updatedBook = await bookService.updateBook(
      id,
      { title, author, publishedYear },
      res
    );
    console.log({ updatedBook });
    if (!updatedBook) {
      return notFound(res, "Book not found");
    }

    success(res, updatedBook, "Book updated successfully");
  } catch (error) {
    serverError(res, error);
  }
};

/**
 * Delete a book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteBook = async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id, res);
    if (!deleted) {
      return notFound(res, "Book not found");
    }
    res.status(204).send();
  } catch (error) {
    serverError(res, error);
  }
};

export default {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};
