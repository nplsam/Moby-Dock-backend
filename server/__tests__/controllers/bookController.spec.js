const bookController = require('../../controllers/bookController')
const Book = require('../../models/Book')

const mockSend = jest.fn()
const mockJson = jest.fn()

const mockStatus = jest.fn(code => ({
  send: mockSend, json: mockJson, end: jest.fn()
}))

const mockRes = { status: mockStatus }

describe('book controller', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns books with status 200', async () => {
    const bookData = { id: 1, name: 'Moby-Dick', author: 'Herman Melville', genre:'Adventure Fiction', reserved: false }

    jest.spyOn(Book, 'getAll')
      .mockResolvedValue(bookData)

    await bookController.index(null, mockRes)
    expect(mockStatus).toHaveBeenCalledWith(200)
    // expect(mockSend).toHaveBeenCalledWith(bookData)
  })


  it('calls Book.getAll', async () => {
    const bookData = { id: 1, name: 'Moby-Dick', author: 'Herman Melville', genre:'Adventure Fiction', reserved: false }

    jest.spyOn(Book, 'getAll')
      .mockResolvedValue(bookData)

    await bookController.index(null, mockRes)
    expect(Book.getAll).toHaveBeenCalledTimes(1)
  })

  it('rejects', async () => {
    jest.spyOn(bookController, 'index')
      .mockRejectedValue(new Error('Something happened to your db'))

      try {

      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toBe('Something happened to your db')
      }
  })

})
