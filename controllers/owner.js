const Owner = require('../schema/owner')

async function getAllOwners() {
  try {
    const owners = await Owner.find({ isActive: true })
    return owners
  } catch (e) {
    return e
  }
}

async function getOwnerById(ownerId) {
  try {
    const owner = await Owner.findById(ownerId)
    return owner
  } catch (e) {
    return e
  }
}

async function createOwner(ownerName) {
  try {
    const newUser = await Owner.create({
      ownerName,
      email: `${ownerName}@test.io`,
      isActive: true
    })
    return newUser
  } catch (e) {
    return e
  }
}

async function deleteOwnerById(ownerId) {
  try {
    const deletedOwner = await Owner.findByIdAndUpdate(ownerId, {
      isActive: false
    })
    return deletedOwner
  } catch (e) {
    return e
  }
}

module.exports = { getOwnerById, getAllOwners, createOwner, deleteOwnerById }
