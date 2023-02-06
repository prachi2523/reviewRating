const company = require('../model/companyModuleSchema');
const user = require('../model/usermoduleSchema');
const { required } = require('joi');
const mongoose = require('mongoose')

const reviewModelschema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    }
})

reviewModelschema.set('timestamps', true)
module.exports = mongoose.model('review', reviewModelschema)
