const db = require('../../../database')

module.exports = {
  async create(name, code, password, email) {
    const result = await db.one('INSERT INTO users (name,code, password, email) VALUES ($1, $2, $3, $4) RETURNING id', [name, code, password, email])
    return result
  },

  async findByEmailOrCode(email, code) {
    const result = await db.query('SELECT * FROM users WHERE email = $1 OR code = $2 LIMIT 1' , [email, code])
    return result
  },

  async findByEmail(email) {
    const [result] = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
    return result
  }
}