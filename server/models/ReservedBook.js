const db = require('../database/connect')

class ReservedBooks {
  constructor(data) {
    this.reserved_id = data.reserved_id
    this.name = data.name
    this.book_id = data.book_id
    this.user_id = data.user_id
    this.pick_up_by= data.pick_up_by
  }

  static async getAll() {
    const response = await db.query ('SELECT reserved_id, name, pick_up_by FROM reserved_books')
    if (response.rows.length === 0) {
      throw new Error('No Reserved books.')
    }
    return response.rows.map(b => new ReservedBooks(b))
  }

  static async getOneById(reserved_id) {
    const response = await db.query('SELECT reserved_id, name, pick_up_by FROM reserved_books WHERE reserved_id = $1', [reserved_id])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate reservation.")
    }
    return new ReservedBooks(response.rows[0]);
  }

  static async create(data) {
    const { name: name, book_id: book_id, user_id: user_id, pick_up_by: pick_up_by} = data
    const response = await db.query('INSERT INTO reserved_books (name, book_id, user_id, pick_up_by) VALUES ($1, $2, $3, $4) RETURNING reserved_id', [name, book_id, user_id, pick_up_by])
    const ReservedId = response.rows[0].reserved_id
    const newReserved = await ReservedBooks.getOneById(ReservedId)
    return newReserved
  }

  async destroy() {
    const response = await db.query('DELETE FROM reserved_books WHERE reserved_id = $1 RETURNING *', [this.reserved_id]);
    if (response.rows.length != 1) {
        throw new Error('Unable to delete reservation.')
    }
    return new ReservedBooks(response.rows[0]);
  }

}

module.exports = ReservedBooks
