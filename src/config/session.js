module.exports = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name:'uniqueSessionID'
}