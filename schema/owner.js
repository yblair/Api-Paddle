const { Schema, model } = require('mongoose')

const ownerSchema = new Schema(
  {
    ownerName: String,
    email: String,
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

const Owner = model('Owner', ownerSchema)

module.exports = Owner
