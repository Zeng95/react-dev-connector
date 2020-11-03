const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = model('User', userSchema)
