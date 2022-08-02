const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    userName: String,
    email: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const User = model('User', userSchema)

module.exports = User
