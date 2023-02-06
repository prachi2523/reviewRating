const usermodelschema = require('./usermoduleSchema')
const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const companyModelSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        require: true
    },
    foundedOn: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    company_logo: {
        type: String
    },


})
companyModelSchema.set('timestamps', true)
module.exports = mongoose.model('company', companyModelSchema)
