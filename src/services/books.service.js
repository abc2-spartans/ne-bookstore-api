import Book from '../models/book.model.js';
import { notFound } from '../utils/apiResponse.js';

/**
 * Get all books
 * @param {Object} res - Express response object
 */
export const getAllBooks = async (res) => {
    try {
        const books = await new Promise((resolve, reject) => {
            Book.getAll((err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        return books;
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch books');
    }
};

/**
 * Get a single book by ID
 * @param {number} id - Book ID
 * @param {Object} res - Express response object
 */
export const getBookById = async (id, res) => {
    try {
        const book = await new Promise((resolve, reject) => {
            Book.getById(id, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!book) {
            notFound(res, 'Book not found');
            return null;
        }

        return book;
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch book');
    }
};

/**
 * Create a new book
 * @param {Object} bookData - Book data
 * @param {Object} res - Express response object
 */
export const createBook = async (bookData, res) => {
    try {
        const { title, author, publishedYear } = bookData;

        if (!title || !author) {
            throw new Error('Title and author are required');
        }

        const newBook = await new Promise((resolve, reject) => {
            Book.create(bookData, (err, book) => {
                if (err) reject(err);
                else resolve(book);
            });
        });

        return newBook;
    } catch (error) {
        console.error(error)
        throw new Error('Failed to create book');
    }
};

/**
 * Update a book
 * @param {number} id - Book ID
 * @param {Object} bookData - Updated book data
 * @param {Object} res - Express response object
 */
export const updateBook = async (id, bookData, res) => {
    try {
        // First check if book exists
        const existingBook = await new Promise((resolve, reject) => {
            Book.getById(id, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!existingBook) {
            notFound(res, 'Book not found');
            return null;
        }

        await new Promise((resolve, reject) => {
            Book.update(id, bookData, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        return { id, ...bookData };
    } catch (error) {
        console.error(error)
        throw new Error('Failed to update book');
    }
};

/**
 * Delete a book
 * @param {number} id - Book ID
 * @param {Object} res - Express response object
 */
export const deleteBook = async (id, res) => {
    try {
        // First check if book exists
        const existingBook = await new Promise((resolve, reject) => {
            Book.getById(id, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!existingBook) {
            notFound(res, 'Book not found');
            return false;
        }

        await new Promise((resolve, reject) => {
            Book.delete(id, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        return true;
    } catch (error) {
        console.error(error)
        throw new Error('Failed to delete book');
    }
};
