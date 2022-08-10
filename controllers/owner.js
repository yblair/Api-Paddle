const Owner = require('../models/Owner')
const bcrypt = require('bcrypt')

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

async function createOwner(name, contact, email, username, password) {
  try {
    const newOwner = await Owner.create({
      name,
      contact,
      email,
      username,
      password,
      isActive: true
    })
    return newOwner
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

async function updatedOwner(ownerId, password, username, contact){
  try{
    if(password !== undefined){
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const updatedOwner = await Owner.findByIdAndUpdate(ownerId, {password: hash, contact, username}, {new: true})
      return updatedOwner
    }
  }catch(e){
    return e
  }
}

module.exports = { getOwnerById, getAllOwners, createOwner, deleteOwnerById, updatedOwner }
