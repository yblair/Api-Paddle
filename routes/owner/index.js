'use strict'
const {
  getAllOwners,
  getOwnerById,
  createOwner,
  deleteOwnerById
} = require('../../controllers/owner')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (_, reply) {
    const owners = await getAllOwners()
    return reply.send(owners)
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
    const { ownerName } = request.body
    try {
      const newOwner = await createOwner(ownerName)
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
