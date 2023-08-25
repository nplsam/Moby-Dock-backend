const Trade = require('../../models/Trade')
const db = require('../../database/connect')

describe('Trade', () => {
  describe('class', () => {
    it('exists', () => {
    expect(Trade).toBeDefined()
  })

    it('should be an instance of Trade', () => {
      const trade = new Trade('Moby-Dick')
      expect(trade).toBeInstanceOf(Trade)
    })
  })
})

describe('getAll', () => {
  it('resolves with Trade on successful', async () => {
    jest.spyOn(db, 'query')
    .mockResolvedValueOnce({
      rows: [{ title: 'Moby-Dick'}, {author: 'Herman Melville'}, {genre: 'Fiction'}, {email: 'bobby@gmail.com'}]
    })
    const trades = await Trade.getAll()
    expect(trades).toHaveLength(4)
  })

  it('should throw an Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))
    try {
      await Trade.getAll()
    } catch (err) {
      expect(err).toBeDefined()
      expect(err.message).toBe('oh no')
    }
  })
})

describe('getOneById', () => {
  it('resolves with Trade on succesful DB query', async () => {
    let tradeData = { id: 1, title: 'Harry P', author: 'J.K Rowling', genre:'Fiction', email: 'bobby@gmail.com' }
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({rows: [tradeData]})

      const result = await Trade.getOneById(1)
      expect(result).toBeInstanceOf(Trade)
      expect(result.title).toBe('Harry P')
  })

  it('should throw Error on db query error', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('Cant locate trade.'))

    try {
      await Trade.getOneById(1)
    } catch (err) {
      expect(err).toBeTruthy()
      expect(err.message).toBe('Cant locate trade.')
    }
  })
})
