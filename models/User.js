const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      require: true,
      lowercase: true
    },
    password: {
      type: String,
      require: true,
      trim: true
    },
    contact: {
      type: Number,
      unique: true,
      require: true
    },
    username: {
      type: String,
      require: true,
      trim: true
    },
    lastName: {
      type: String,
      require: true,
      trim: true
    },
    score: {
      type: Number
    },
    history: {
      type: Array
    },
    padelFields: [],
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

const User = model('user', userSchema)
module.exports = User
