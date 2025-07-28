import { db } from '../db/init.js';

class Book {
    static getAll(callback) {
        return db.all('SELECT * FROM books', callback);
    }

    static getById(id, callback) {
        return db.get('SELECT * FROM books WHERE id = ?', [id], callback);
    }

    static create(book, callback) {
        const { title, author, published_year } = book;
        return db.run(
            'INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)',
            [title, author, published_year],
            function (err) {
                callback(err, { id: this.lastID, ...book });
            }
        );
    }

    static update(id, book, callback) {
        const { title, author, published_year } = book;
        return db.run(
            'UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?',
            [title, author, published_year, id],
            callback
        );
    }

    static delete(id, callback) {
        return db.run('DELETE FROM books WHERE id = ?', [id], callback);
    }
}

export default Book;
