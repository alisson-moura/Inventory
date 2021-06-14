const db = require('../../../database')

module.exports = {
  async create({ name, serial_number, price, category, status, locale, company }) {
    const query =
      `INSERT INTO equipaments 
    (name, serial_number, locale_id, status_id, category_id, price, company_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
    const result = await db.one(query, [name, serial_number, locale, status, category, price, company])
    return result
  },

  async findByNameAndSerialNumber(name, serial_number) {
    const query = `
      SELECT * FROM equipaments
      WHERE name = $1
      OR serial_number = $2
      LIMIT 1
    `
    const [result] = await db.query(query, [name, serial_number])
    return result
  }
}