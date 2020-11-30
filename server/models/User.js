const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mongoose = require('mongoose')
const { Schema, model } = mongoose
const config = require('config')

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
    unique: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    minlength: 16
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.generateJWT = function (userId) {
  const payload = { userId }

  // Generate a signed JSON web token with the user id and return it in the response
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '3d' })
}

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 14400000 // expires in three hours
}

module.exports = model('User', userSchema)
