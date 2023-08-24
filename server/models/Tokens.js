const { v4: uuidv4 } = require('uuid')
const db = require('../database/connect')

class Token {

  constructor({ id, user_id, token }){
    this.id = id
    this.user_id = user_id
    this.token = token
  }

  static async create(user_id) {
    const token = uuidv4();
    const response = await db.query('INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING id',
        [user_id, token]);
    const newId = response.rows[0].id;
    const newToken = await Token.getOneById(newId);
    return newToken;
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM token WHERE id = $1', [id]);
    if (response.rows.length != 1) {
        throw new Error('Unable to locate token.');
    } else {
        return new Token(response.rows[0]);
    }
  }

  static async getOneByToken(token) {
    const response = await db.query('SELECT * FROM token WHERE token = $1', [token]);
    if (response.rows.length != 1) {
        throw new Error('Unable to locate token.');
    } else {
        return new Token(response.rows[0]);
    }
  }

  static async destroyByToken(token) {
    try {
      await db.query('DELETE FROM token WHERE token = $1', [token]);
    } catch (error) {
      throw new Error('Unable to delete token.');
    }
  }
}

module.exports = Token
