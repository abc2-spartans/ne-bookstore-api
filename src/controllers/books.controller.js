import * as bookService from '../services/books.service.js';
import { success, created, badRequest, serverError } from '../utils/apiResponse.js';

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
        const { id } = req.params;
        const book = await bookService.getBookById(id, res);

        if (book) {
            success(res, book, 'Book retrieved successfully');
        }
        // If book is null, the notFound response was already sent
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
        const bookData = req.body;
        const newBook = await bookService.createBook(bookData, res);

        if (newBook) {
            created(res, newBook, 'Book created successfully');
        }
    } catch (error) {
        badRequest(res, error.message, error);
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
        const bookData = req.body;

        const updatedBook = await bookService.updateBook(id, bookData, res);

        if (updatedBook) {
            success(res, updatedBook, 'Book updated successfully');
        }
    } catch (error) {
        badRequest(res, error.message, error);
    }
};

/**
 * Delete a book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await bookService.deleteBook(id, res);

        if (deleted) {
            success(res, null, 'Book deleted successfully');
        }
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
