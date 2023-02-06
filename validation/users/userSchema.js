const { userLogin } = require('../../controller/userController');
const { joiPasswordExtendCore } = require("joi-password")
const joi = require('joi');
const joiPassword = joi.extend(joiPasswordExtendCore)

const schema = {
    createUser: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .messages({
                'passwors.minOfUppercase': '{#label} should contain at least {#min} uppercase',
                'password.minOfSpecialCharacters': '{#label} should contain atleat {#min} special character',
                'password.minOfNumeric': '{#label} should contain atleast {#min} numeric charcter',
                'password.noWhitespaces': '{#label} should not contain white spaces',
            }).required(),
        city: joi.string().required(),
        contact: joi.number().integer().min(1000000000).max(9999999999).message('invalid mobile number'),
        state: joi.string().required()
    }).unknown(true),


    userLogin: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }).unknown(true)
}


module.exports = schema;