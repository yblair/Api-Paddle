const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userName: String,
  createAt: Date
})

const User = model('User', userSchema)

module.exports = User
