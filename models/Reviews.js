const { Schema, model } = require('mongoose')

const reviewsSchema = new Schema(
  {
    raiting: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    padelField: [],
    user: [],
  },
  {
    timestamps: true,
    versionKey: false
  }
)

reviewsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})




const Reviews = model('reviews', reviewsSchema)

module.exports = Reviews
