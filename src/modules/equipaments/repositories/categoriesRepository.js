const db = require('../../../database')

module.exports = {
  async create(name) {
    const result = await db.one('INSERT INTO categories (name) VALUES ($1) RETURNING id', [name])
    return result
  },

  async findAll() {
    const result = await db.query('SELECT * FROM categories')
    return result
  }
}