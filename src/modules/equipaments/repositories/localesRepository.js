const db = require('../../../database')

module.exports = {
  async create(name, company_id, cost_center) {
    const result = await db.one('INSERT INTO locales (name, company_id, cost_center) VALUES ($1, $2, $3) RETURNING id', [name, company_id, cost_center])
    return result
  },

  async findAll() {
    const result = await db.query('SELECT * FROM locales')
    return result
  }
}