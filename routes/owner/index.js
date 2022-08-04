'use strict'
const {
  getAllOwners,
  getOwnerById,
  createOwner,
  deleteOwnerById
} = require('../../controllers/owner')
const { pagination } = require('../../utils/pagination')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const { page, limit } = request.query
      const owners = await getAllOwners()
      const result = pagination(owners, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.lo.error(e)
    }
  })

  fastify.get('/:ownerId', async function (request, reply) {
    const { ownerId } = request.params
    try {
      const owner = await getOwnerById(ownerId)
      return reply.send(owner)
    } catch (e) {
      return e
    }
  })

  fastify.post('/', async function (request, reply) {
    const { name, contact, email, username, password } = request.body
    try {
      const newOwner = await createOwner(
        name,
        contact,
        email,
        username,
        password
      )
      return reply.send(newOwner)
    } catch (e) {
      return e
    }
  })

  fastify.delete('/:ownerId', async function (request, reply) {
    const { ownerId } = request.params
    try {
      const deletedOwner = await deleteOwnerById(ownerId)
      return reply.send(deletedOwner)
    } catch (e) {
      return e
    }
  })
}
