const { Schema, model } = require('mongoose')
// const mongoose = require('mongoose')

const reviewsSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: {       
      type: String   
    },
    idUser: [],
   
    isActive: Boolean
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

// reviewsSchema.pre(/^find/, function (next) {
//   const query = [
//     // { path: 'tour', select: 'username' },
//     { path: 'user', select: 'username' },
//   ];
//   this.populate(query);
//   next();
// });



const Reviews = model('Reviews', reviewsSchema)

module.exports = Reviews
