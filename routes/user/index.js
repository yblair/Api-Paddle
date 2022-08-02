'use strict'
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById
} = require('../../controllers/user')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (_, reply) {
    const users = await getAllUsers()
    return reply.send(users)
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
    const { userName } = request.body
    try {
      const newUser = await createUser(userName)
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
