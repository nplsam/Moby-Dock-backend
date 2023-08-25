const db = require('../database/connect')

class Book {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.author = data.author
    this.genre = data.genre
    this.reserved = data.reserved
    this.image = data.image
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

  static async findByName(name) {
    const response = await db.query('SELECT * FROM books WHERE LOWER(name) = $1', [name]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate book.")
    }
    return new Book(response.rows[0]);
  }

  static async findByGenre(genre) {
    const response = await db.query('SELECT * FROM books WHERE LOWER(genre) = $1', [genre]);
    if (response.rows.length === 0) {
        throw new Error("No books found for the specified genre.")
    }
    return response.rows.map(row => new Book(row))
  }

  static async create(data) {
    const { name: name, author: author, genre: genre, reserved: reserved, image: image } = data
    const response = await db.query('INSERT INTO books (name, author, genre) VALUES ($1, $2, $3) RETURNING *', [name, author, genre, reserved, image]);
    const bookId = response.rows[0].id
    const newBook = await Book.getOneById(bookId)
    return newBook
  }

  async update(data) {
    const { name: name, author: author, genre: genre, reserved: reserved } = data
    const response = await db.query('UPDATE books SET name = $1, author = $2, genre = $3 WHERE id = $4 RETURNING *', [name, author, genre, reserved, this.id])

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
