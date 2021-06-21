const Joi = require('joi')
const categoriesRepository = require('../repositories/categoriesRepository')
const companiesRepository = require('../repositories/companiesRepository')
const equipamentRepository = require('../repositories/equipamentsRepository')
const localesRepository = require('../repositories/localesRepository')
const statusRepository = require('../repositories/statusRepository')

module.exports = {
  async index(req, res) {
    const equipaments = await equipamentRepository.findAll(20)
    res.render('Equipaments/equipaments.njk', {title: 'Equipamentos', equipaments})
  },

  async store(req, res) {
    const {name, serial_number, price, category, status, company, locale} = req.body
    
    // Validação de dados
    let { error, value } = Joi.object({
      name: Joi.string().required().min(2).max(40),
      serial_number: Joi.string().required().min(3).max(10),
      price: Joi.number(),
      category: Joi.number().required(),
      status: Joi.number().required(),
      company: Joi.number().required(),
      locale: Joi.number().required(),
    }).validate(req.body, { abortEarly: false })
    
    // verifica se o equipamento já existe
    const checkEquipamentExists = await equipamentRepository.findByNameAndSerialNumber(name, serial_number)

    // tratamento de erros
    if (error || checkEquipamentExists) {
      if(!error) {
        error = "Equipamentos duplicados não são permitidos!"
      }
      const categories = await categoriesRepository.findAll()
      const status = await statusRepository.findAll()
      const companies = await companiesRepository.findAll()
      const locales = await localesRepository.findAll()
      return res.render('Equipaments/new-equipament.njk', {title:'Novo Equipamento', categories, status, companies, locales, error})
    }

    await equipamentRepository.create({
      name,
      serial_number,
      category,
      company,
      locale,
      price,
      status
    })

    return res.redirect('/')
  },

  async getNewEquipamentPage(req, res) {
    const categories = await categoriesRepository.findAll()
    const status = await statusRepository.findAll()
    const companies = await companiesRepository.findAll()
    const locales = await localesRepository.findAll()
    res.render('Equipaments/new-equipament.njk', {title:'Novo Equipamento', categories, status, companies, locales})
  },

}