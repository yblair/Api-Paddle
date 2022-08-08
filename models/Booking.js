const { Schema, model } = require('mongoose')

const ownerSchema = new Schema(
    {
        idUser:
        {
            type: String,
            require: true
        },
        idField:
        {
            type: String,
            require: true
        },
        date:
        {
            type: Date,
            require: true
        },
        isActive: Boolean
    },
    {
        timestamps: true,
        versionKey: false
    });

ownerSchema.set('toJSON', {
        transform: (document, returnedObject) =>
        {
          returnedObject.id = returnedObject._id
          delete returnedObject._id
        }
      });

const Booking = model('booking', ownerSchema)

module.exports = Booking