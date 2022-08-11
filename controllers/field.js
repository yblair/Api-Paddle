const PadelField = require('../models/PadelField')
const Owner = require('../models/Owner')
const Reviews = require('../models/Reviews')

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

async function updateField(fieldId, price, availability, image, name, location, type, horario) {
  try{
    
      const updateField = await PadelField.findByIdAndUpdate(fieldId, {price, availability, image, name, location, type, horario} , {new:true})
      return updateField;
  }catch(e){
    return e
  }
}

async function registerReviews( fielId, rating, review) {
  try {
      // const search = await PadelField.findById(fielId);
     const newReviews = await Reviews.create({
          rating,
          review,
          isActive: true,
     })
      await PadelField.findByIdAndUpdate(fielId, {
          $push: {
              review: {
                  _id: newReviews._id
              }
          }
      })
      return newReviews.save()
  }catch(e) {
      return e
  }
  
}

async function getReviews() {
  try {
      const reviews = await Reviews.find({isActive: true});
      return reviews;
  }catch(e) {
      return e
  }
}

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
  getReviews
}
