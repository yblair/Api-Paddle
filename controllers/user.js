const User = require('../schema/user')

async function getAllUsers() {
  try {
    const users = await User.find({ isActive: true })
    return users
  } catch (e) {
    return e
  }
}

async function getUserById(userId) {
  console.log(typeof User)
  try {
    const user = await User.findById(userId)
    return user
  } catch (e) {
    return e
  }
}

async function createUser(userName) {
  try {
    const newUser = await User.create({
      userName,
      email: `${userName}@test.io`,
      isActive: true
    })
    return newUser
  } catch (e) {
    return e
  }
}

async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndUpdate(userId, {
      isActive: false
    })
    return deletedUser
  } catch (e) {
    return e
  }
}

module.exports = { getUserById, getAllUsers, createUser, deleteUserById }
