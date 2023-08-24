const Book = require('../../models/Book')
const db = require('../../database/connect')

describe('Book', () => {
  describe('class', () => {
    it('exists', () => {
    expect(Book).toBeDefined()
  })

    it('should be an instance of Book', () => {
      const book = new Book('Moby-Dick')
      expect(book).toBeInstanceOf(Book)
    })
  })
})

describe('getAll', () => {
  it('resolves with Books on successful', async () => {
    jest.spyOn(db, 'query')
    .mockResolvedValueOnce({
      rows: [{ name: 'Moby-Dick'}, {author: 'Herman Melville'}, {genre: 'Adventure Fiction'}, {reserved: false}]
    })
    const books = await Book.getAll()
    expect(books).toHaveLength(4)
  })

  it('should throw an Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('uh oh, error'))
    try {
      await Book.getAll()
    } catch (err) {
      expect(err).toBeDefined()
      expect(err.message).toBe('uh oh, error')
    }
  })
})

describe('getOneById', () => {
  it('resolves with book on successful db query', async () => {
    let bookData = { id: 1, name: 'Moby-Dick', author: 'Herman Melville', genre:'Adventure Fiction', reserved: false }
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({rows: [bookData]})

      const result = await Book.getOneById(1)
      expect(result).toBeInstanceOf(Book)
      expect(result.name).toBe('Moby-Dick')
  })

  it('should throw Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to locate book.'))

    try {
      await Book.getOneById(1)
    } catch (err) {
      expect(err).toBeTruthy()
      expect(err.message).toBe('Unable to locate book.')
    }
  })
})

