const request = require('supertest')
const app = require('../api')

describe('api server', () => {
  let api

  beforeAll( ()=> {
    api = app.listen(5000, () => {
      console.log('Test server running in port 5000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully stopping the test server')
    api.close(done)
  })

  test('it responds to GET / with status 200', (done) => {
    request(api)
      .get('/')
      .expect(200, done)
  })
})
