const { createCompany } = require('../../controller/companyController')
const Joi = require('joi')

const schema = {
    createCompany: Joi.object({
        companyName: Joi.string().required(),
        location: Joi.string().required(),
        city: Joi.string().required(),
        foundedOn: Joi.date().iso().required(),
        userId: Joi.required(),
    }),
}

module.exports = schema