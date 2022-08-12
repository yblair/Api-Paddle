const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt")

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
    role:{
      type: String,
      default: 'user'
    },
    score: {
      type: Number
    },
    history: {
      type: Array
    },
    review: [],
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

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = model('user', userSchema)
module.exports = User
