// const User = require('../models/user');
// const PadelField = require('../models/PadelField');
const Reviews = require('../models/Reviews');


// A modo de prueba!!

async function getReviews() {
    try {
        const reviews = await Reviews.find({isActive: true});
        return reviews;
    }catch(e) {
        return e
    }
}

// async function registerReviews( fielId, rating, review) {
//     try {
//         const search = await PadelField.findById(fielId);
//        const newReviews = await Reviews.create({
//             rating,
//             review,
//             padelFieldsID: search,
//             isActive: true,
//        })
    
//         return newReviews.save()
//     }catch(e) {
//         return e
//     }
    
// }

module.exports = {
    getReviews,
    // registerReviews
}