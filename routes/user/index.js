'use strict'
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser
} = require('../../controllers/user')
const bcrypt = require('bcrypt')
require('dotenv')
const user = require('../../models/User')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const users = await getAllUsers()
      return reply.send(users)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const user = await getUserById(userId)
      return reply.send(user)
    } catch (e) {
      return e
    }
  })

  fastify.post('/', async function (request, reply) {
    const { username, name, lastName, contact, email, password } = request.body
    try {
      const newUser = await createUser(
        username,
        name,
        lastName,
        contact,
        email,
        password
      )

      const token = fastify.jwt.sign({ newUser })

      return reply.send({ newUser, token })
    } catch (e) {
      return e
    }
  })

  fastify.post('/login', function (request, reply) {
    const { email, password } = request.body
    try {
      user.findOne({ email }).then((user) => {
        if (!user) return reply.status(400).send({ msg: 'User not exist' })
        bcrypt.compare(password, user.password, (err, data) => {
          if (err) throw err
          if (data) {
            const userId = data.id
            const accessToken = fastify.jwt.sign({ userId })
            return reply.status(200).send({ msg: 'Login success', accessToken })
          } else {
            return reply.status(401).send({ msg: 'Invalid credencial' })
          }
        })
      })
    } catch (err) {
      reply.send(err, 'este errawr')
    }
  })

  fastify.delete('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const deletedUser = await deleteUserById(userId)
      return reply.send(deletedUser)
    } catch (e) {
      return e
    }
  })

  fastify.put('/:userId', async function (request, reply) {
    const { userId } = request.params
    const { password, contact, username } = request.body
    try {
      const updateResult = await updateUser(userId, password, username, contact)
      return reply.send(updateResult)
    } catch (e) {
      return e
    }
  })
}
