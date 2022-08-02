const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    userName: String,
    email: String,
    isActive: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const User = model('User', userSchema)

module.exports = User
