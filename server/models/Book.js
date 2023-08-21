const db = require('../database/connect')

class Book {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.author = data.author
    this.genre = data.genre
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM books');
    if (response.rows.length === 0) {
        throw new Error("No books available.")
    }
    return response.rows.map(b => new Book(b));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate book.")
    }
    return new Book(response.rows[0]);
  }

  static async create(data) {
    const { name: name, author: author, genre: genre } = data
    const response = await db.query('INSERT INTO books (name, author, genre) VALUES ($1, $2, $3) RETURNING *', [name, author, genre]);
    const bookId = response.rows[0].book_id;
    const newBook = await Book.getOneById(bookId);
    return newBook;
}

async update(data) {
  const { name: name, author: author, genre: genre } = data
  const response = await db.query('UPDATE books SET name = $1, author = $2, genre = $3 WHERE book_id = $4 RETURNING *', [name, author, genre, this.id])

  if (response.rows.length != 1) {
      throw new Error('Unable to update book.')
  }
  return new Book(response.rows[0]);
}

async destroy() {
  const response = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [this.id]);
  if (response.rows.length != 1) {
      throw new Error('Unable to delete book.')
  }
  return new Book(response.rows[0]);
}
  
}

module.exports = Book
