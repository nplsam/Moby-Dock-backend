const db = require('../../database/connect')
const ReservedBook = require('../../models/ReservedBook')

describe('ReservedBook', () => {
  describe('class', () => {
    it('exists', () => {
    expect(ReservedBook).toBeDefined()
  })

    it('should be an instance of ReservedBook', () => {
      const reservedBook = new ReservedBook('Pride and Prejudice')
      expect(reservedBook).toBeInstanceOf(ReservedBook)
    })
  })
})

describe('getAll', () => {
  it('resolves with reserved books on successful', async () => {
    jest.spyOn(db, 'query')
    .mockResolvedValueOnce({
      rows: [{ name: 'Pride and Prejudice'}, {pickUpBy: '23/08/2023'}]
    })
    const reservedbooks = await ReservedBook.getAll()
    expect(reservedbooks).toHaveLength(2)
  })

  it('should throw an Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('uh oh, error'))
    try {
      await ReservedBook.getAll()
    } catch (err) {
      expect(err).toBeDefined()
      expect(err.message).toBe('uh oh, error')
    }
  })
})

describe('getOneById', () => {
  it('resolves with reserved book on successful db query', async () => {
    let bookData = { reserved_id: 1, book_id: 3, name: 'Pride and Prejudice', pick_up_by: '23/08/2023'}
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({rows: [bookData]})

      const result = await ReservedBook.getOneById(1)
      expect(result).toBeInstanceOf(ReservedBook)
      expect(result.name).toBe('Pride and Prejudice')
  })

  it('should throw Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to locate reserved book.'))

    try {
      await ReservedBook.getOneById(1)
    } catch (err) {
      expect(err).toBeTruthy()
      expect(err.message).toBe('Unable to locate reserved book.')
    }
  })
})

describe('create', () => {
  it('should create reserved book with data', async() => {
    let bookData = { book_id: 3, name: 'Pride and Prejudice', pick_up_by: '23/08/2023'}
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({ rows: [{...bookData, reserved_id: 1 }] })

      const result = await ReservedBook.create(bookData)
      expect(result).toHaveProperty('reserved_id')
      expect(result).toHaveProperty('book_id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('pick_up_by')
  })

  it('should throw an Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('Book id missing'))

    try {
      await ReservedBook.create({})
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error.message).toBe('Book id missing')
    }
  })
})
