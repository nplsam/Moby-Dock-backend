const tradeController = require('../../controllers/tradeController')
const Trade = require('../../models/Trade')

const mockSend = jest.fn()
const mockJson = jest.fn()

const mockStatus = jest.fn(code => ({
  send: mockSend, json: mockJson, end: jest.fn()
}))

const mockRes = { status: mockStatus }

describe('trade controller', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns trades with status 200', async () => {
    const tradeData = { id: 1, name: 'Harry P', author: 'J.K. Rowling', genre:'Fiction', email:'bobby@gmail.com' }

    jest.spyOn(Trade, 'getAll')
      .mockResolvedValue(tradeData)

    await tradeController.index(null, mockRes)
    expect(mockStatus).toHaveBeenCalledWith(200)
  })


  it('calls Trade.getAll', async () => {
    const tradeData = { id: 1, name: 'Harry P', author: 'J.K. Rowling', genre:'Fiction', email:'bobby@gmail.com' }

    jest.spyOn(Trade, 'getAll')
      .mockResolvedValue(tradeData)

    await tradeController.index(null, mockRes)
    expect(Trade.getAll).toHaveBeenCalledTimes(1)
  })

  it('rejects', async () => {
    jest.spyOn(tradeController, 'index')
      .mockRejectedValue(new Error('Something happened to your db'))

      try {

      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toBe('Something happened to your db')
      }
  })

})
