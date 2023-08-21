
class Book {
  constructor(data) {
    this.id = data.book_id
    this.title = data.title
    this.author = data.author
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM books');
    if (response.rows.length === 0) {
        throw new Error("No books available.")
    }
    return response.rows.map(b => new Book(b));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM books WHERE book_id = $1', [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate book.")
    }
    return new Book(response.rows[0]);
  }

  static async create(data) {
    const { book_id, title, author } = data
    const response = await db.query('INSERT INTO books ( book_id, title, author) VALUES ($1, $2, $3) RETURNING *', [book_id, title, author]);
    const bookId = response.rows[0].book_id;
    const newBook = await Book.getOneById(bookId);
    return newBook;
}

async update(data) {
  const { title: title, author: author } = data
  const response = await db.query('UPDATE books SET title = $1, author = $2 WHERE book_id = $3 RETURNING *', [title, author, this.id])

  if (response.rows.length != 1) {
      throw new Error('Unable to update book.')
  }
  return new Book(response.rows[0]);
}

async destroy() {
  const response = await db.query('DELETE FROM books WHERE book_id = $1 RETURNING *', [this.id]);
  if (response.rows.length != 1) {
      throw new Error('Unable to delete book.')
  }
  return new Book(response.rows[0]);
}
  
}



module.exports = Book
