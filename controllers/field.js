const PadelField = require('../models/PadelField')
const Owner = require('../models/Owner')
const Reviews = require('../models/Reviews')
const User = require('../models/User')

async function getAllFields() {
  try {
    const fields = await PadelField.find({ isActive: true })
    return fields
  } catch (e) {
    return e
  }
}

async function getFieldById(ownerId) {
  try {
    const field = await PadelField.findById(ownerId)
    return field
  } catch (e) {
    return e
  }
}

async function registerField(name, location, image, type, price, ownerId) {
  try {
    const newField = await PadelField.create({
      name,
      location,
      image,
      type,
      price,
      owner: ownerId,
      isActive: true,
      availability: true
    })
    await Owner.findByIdAndUpdate(ownerId, {
      $push: {
        padelFields: {
          _id: newField._id
        }
      }
    })
    return newField.save()
  } catch (e) {
    return e
  }
}

async function deleteField(fieldId) {
  try {
    const deletedField = await PadelField.findByIdAndUpdate(fieldId, {
      isActive: false
    })
    return deletedField
  } catch (e) {
    return e
  }
}

async function getTypeFieldsFilter(typeField) {
  try {
    const result = await PadelField.find({ isActive: true, type: typeField })
    return result
  } catch (e) {
    return e
  }
}

async function filterByAvailability(active) {
  try {
    const result = await PadelField.find({
      isActive: true,
      availability: active
    })
    return result
  } catch (e) {
    return e
  }
}

async function sortFieldBy(sort) {
  try {
    const result = await PadelField.find({ isActive: true }).sort({
      price: sort
    })
    return result
  } catch (e) {
    return e
  }
}

async function searhcFieldByName(name) {
  try {
    const result = await PadelField.find({
      isActive: true,
      name: { $regex: name, $options: 'i' }
    })
    return result
  } catch (e) {
    return e
  }
}

async function getPriceByRange(minPrice, maxPrice)
{
  try
  {
    const result = await PadelField.find(
      {
        isActive: true,
        price:
        {
          $gte: minPrice,
          $lte: maxPrice
        }
      });

    return result;
  }
  catch(e)
  {
    return e;
  }
}

async function updateField(fieldId, price, availability, image, name, location, type, horario, isActive) {
  try{
    
      const updateField = await PadelField.findByIdAndUpdate(fieldId, {price, availability, image, name, location, type, horario, isActive} , {new:true})
      return updateField;
  }catch(e){
    return e
  }
}

//crear la review


      
  



 async function registerReviews( fieldId, idUser, rating, review) {
  try {
      
     const newReviews = await Reviews.create({
          idUser,
          rating,
          review
        
     })
      await PadelField.findByIdAndUpdate(fieldId, {
          $push: {
            /*   review: {
                  _id: newReviews._id
              } */
              review: {
                rating,
                idUser,
                review
              }
          }
      })
    
      await User.findByIdAndUpdate(idUser ,{ 
        $push: {
             review: {
                  fieldId,
                  _id: newReviews._id
        }}
      })
      return newReviews.save()
  }catch(e) {
      return e
  }
  
} 


//f que haga el push de la review al schema user

//y esto?
async function getReviews() {
  try {
    const reviews = await Reviews.find({isActive: true});
    return reviews;
  }catch(e) {
    return e
  }
}
async function getAverage(idField) {
  try{
    let arr = []
    const result = await PadelField.findById(idField)
    const hola = await result.review
    for (const [rating, value] of hola) {

      
    }
  }
  catch(e){}
}

async function getAverageRating(fieldId) {
     try {      
          const reviews = await Reviews.find({
                   _id: { $in: result.review },      
                    isActive: true     })     
                    let sum = 0     
                    for (let i = 0; i < reviews.length; i++) 
                    {       sum += reviews[i].rating     }   
                      const average = sum / reviews.length 
                          return average  
                         } catch (e) 
                         {     return e  
                         } }

module.exports = {
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter,
  filterByAvailability,
  sortFieldBy,
  searhcFieldByName,
  getPriceByRange,
  updateField,
  registerReviews,
  getReviews,
  getAverage
}
