const mongoose = require('mongoose')

const userModelschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true

  },
  city: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    requiured: true
  },
  profilepic: {
    type: String,
    // required:true
  },

  isActive: {
    type: Boolean,
    default: true
  },
  state: {
    type: String,
    required: true
  },
  token: {
    type: String
  }

})
userModelschema.set('timestamps', true)
module.exports = mongoose.model('user', userModelschema)
module.exports = mongoose.model('user', userModelschema);
