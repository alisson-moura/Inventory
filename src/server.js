require('dotenv').config()

const express = require('express')
require('express-async-errors')
const session = require('express-session')
const nunjucks = require('nunjucks');

const db = require("./database")
const sessionConfig = require('./config/session')
const routes = require('./routes');

db.connect().then(obj => {
  // Can check the server version here (pg-promise v10.1.0+):
  const serverVersion = obj.client.serverVersion;
  console.log(`Connected database - pg version: ${serverVersion}`)
  obj.done(); // success, release the connection;
})
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });


const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig))

app.use(express.static('public'));
app.set("view engine", "njk");
nunjucks.configure('./src/views', {
  autoescape: false,
  express: app,
  noCache: true
})

app.use(routes)
app.listen(process.env.HTTP_PORT, () => console.log('Listening on port: ' + process.env.HTTP_PORT))