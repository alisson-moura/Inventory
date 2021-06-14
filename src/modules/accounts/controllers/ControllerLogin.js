const Joi = require('joi')
const usersRepository = require('../repositories/UsersRepository')

module.exports = {
  async getLogin(req, res) {
    return res.render('Login/login.njk')
  },

  async login(req, res) {
    const { email, password } = req.body

    // validação de dados
    const { error, value } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(10),
    }).validate(req.body, { abortEarly: false })
    if (error) {
      console.log(error)
      return res.render('Login/login', { error })
    }

    const user = await usersRepository.findByEmail(email)
    if (!user || user.password !== password) {
      const error = "E-mail ou senha incorretos!"
      console.log(error)
      return res.render('Login/login', { error })
    }

    req.session.user_id = user.id
    return res.redirect('/',)
  },

  async logout(req, res) {
    await req.session.destroy();
    return res.redirect("/accounts");
  },

  async getRegister(req, res) {
    return res.render('Login/register.njk')
  },

  async createAccount(req, res) {
    const { name, code, email, password } = req.body

    const { error, value } = Joi.object({
      name: Joi.string().required().min(2).max(40),
      password: Joi.string().required().min(6).max(10),
      confirmPassword: Joi.ref('password'),
      email: Joi.string().email().required(),
      code: Joi.number().required().min(0)
    }).validate(req.body, { abortEarly: false })
    if (error) {
      return res.render('Login/register', { error })
    }

    const user = await usersRepository.findByEmailOrCode(email, code)
    if (user.length > 0) {
      let error = "Este e-mail ou crachá já está em uso!"
      return res.render('Login/register', { error })
    }
    await usersRepository.create(name, code, password, email)

    return res.redirect("/")
  }
}