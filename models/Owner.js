const { Schema, model } = require('mongoose')

const ownerSchema = new Schema(
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
    contact: {
      type: Number,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true,
      trim: true
    },
    username: {
      type: String,
      require: true,
      trim: true
    },
    padelFields: [],
    isActive: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
)

ownerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

const Owner = model('owner', ownerSchema)

module.exports = Owner
