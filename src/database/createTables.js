require('dotenv').config()
const db = require('./index')

const query = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(12) NOT NULL,
  is_admin BOOLEAN DEFAULT false
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT NULL
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT NULL
);

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT NULL
);

CREATE TABLE locales (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description TEXT NULL,
  company_id INT NOT NULL REFERENCES companies(id)
);

CREATE TABLE equipaments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  serial_number VARCHAR(30) NOT NULL UNIQUE,
  price NUMERIC NULL, 
  description TEXT NULL,
  category_id INT NOT NULL REFERENCES categories(id),
  status_id INT NOT NULL REFERENCES status(id),
  company_id INT NOT NULL REFERENCES companies(id),
  locale_id INT NOT NULL REFERENCES locales(id)
);
`
db.query(query).then(res => {
  console.log('Tabelas criadas com sucesso')
})
.catch(err => {
  console.log(err.stack)
})
.finally(() => {
  process.exit()
})