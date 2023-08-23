const db = require('../database/connect')

class ReservedBooks {
  constructor(data) {
    this.Reserved_id = data.Reserved_id
    this.name = data.name
    this.book_id = data.book_id
    this.user_id = data.user_id
    this.checkout_date = data.checkout_date
    this.due_date = data.due_date
  }

  static async getAll() {
    const response = await db.query ('SELECT name, checkout_date, due_date FROM Reserved_books ORDER BY due_date' )
    if (response.rows.length === 0) {
      throw new Error('No Reserved books.')
    }
    return response.rows.map(b => new ReservedBooks(b))
  }

  static async getOneById(book_id) {
    const response = await db.query('SELECT name, checkout_date, due_date FROM Reserved_books WHERE book_id = $1', [book_id])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate book.")
    }
    return new ReservedBooks(response.rows[0]);
  }

  static async findByName(name) {
    const response = await db.query('SELECT name, checkout_date, due_date FROM Reserved_books WHERE LOWER(name) = $1', [name])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate book.")
    }
    return new ReservedBooks(response.rows[0]);
  }

  static async create(data) {
    const { name: name, book_id: book_id, user_id: user_id, pick_up_by: pick_up_by} = data
    const response = await db.query('INSERT INTO books (name, book_id, user_id, pick_up_by) VALUES ($1, $2, $3, $4) RETURNING *', [name, book_id, user_id, pick_up_by])
    const ReservedBookId = response.rows[0].id
    const newReservedBook = await ReservedBooks.getOneById(ReservedBookId)
    return newReservedBook
  }

  async destroy() {
    const response = await db.query('DELETE FROM reserved_books WHERE book_id = $1 RETURNING *', [this.book_id]);
    if (response.rows.length != 1) {
        throw new Error('Unable to delete book.')
    }
    return new ReservedBooks(response.rows[0]);
  }
}

module.exports = ReservedBooks
