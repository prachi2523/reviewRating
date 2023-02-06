const { review } = require('../../controller/reviewController')
const Joi = require('joi')

const schema = {
    addReview: Joi.object({
        subject: Joi.string().required(),
        rating: Joi.number().required(),
        user_id: Joi.string().required(),
        company_id: Joi.string().required()
    }).unknown(true),

    updateReview: Joi.object({
        subject: Joi.string().required(),
        rating: Joi.number().required(),
        user_id: Joi.string().required(),
        company_id: Joi.string().required()
    }).unknown(true),
}


module.exports = schema