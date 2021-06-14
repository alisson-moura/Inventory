const db = require('../../../database')

module.exports = {
  async create(name) {
    const result = await db.one('INSERT INTO status (name) VALUES ($1) RETURNING id', [name])
    return result
  },

  async findAll() {
    const result = await db.query('SELECT * FROM status')
    return result
  }
}