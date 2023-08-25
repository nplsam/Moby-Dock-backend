const db = require('../database/connect')

class Trade {
  constructor(data) {
    this.id = data.post_id;
    this.title = data.title;
    this.author = data.author;
    this.genre = data.genre;
    this.email = data.email;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM trades");
    return response.rows.map(p => new Trade(p));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM trades WHERE post_id = $1", [id])
    if (response.rows.length !=1) {
      throw new Error("Unable to locate post.")
    }
    return new Trade(response.rows[0]);
  }

  static async create(data) {
    const { title, author, genre, email } = data;
    let response = await db.query("INSERT INTO trades (title, author, genre, email) VALUES ($1, $2, $3, $4) RETURNING post_id",
    [title, author, genre, email])
    const newId = response.rows[0].post_id;
    const newPost = await Trade.getOneById(newId);
    return newPost;
  }

  async destroy() {
    let response = await db.query("DELETE FROM trades WHERE post_id = $1 RETURNING *;", [this.id]);
    return new Trade(response.rows[0])
  }
}

module.exports = Trade
