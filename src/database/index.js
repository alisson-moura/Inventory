const pgp = require('pg-promise')()
const connectionOptions = require('../config/database')

const db = pgp(connectionOptions)

module.exports = db