'use strict'
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById
} = require('../../controllers/user')
const { pagination } = require('../../utils/pagination')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const { page, limit } = request.query
      const users = await getAllUsers()
      const result = pagination(users, page, limit)
      return reply.send(result)
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
      return reply.send(newUser)
    } catch (e) {
      return e
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
}
