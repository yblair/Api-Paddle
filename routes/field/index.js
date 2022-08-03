'use strict'
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields
} = require('../../controllers/field')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (_, reply) {
    const fields = await getAllFields()
    return reply.send(fields)
  })

  fastify.get('/:filedId', async function (request, reply) {
    const { filedId } = request.params
    try {
      const field = await getFieldById(filedId)
      return reply.send(field)
    } catch (e) {
      return e
    }
  })

  fastify.post('/', async function (request, reply) {
    const { name, location, image, type, price, owner } = request.body
    try {
      const newFiled = await registerField(
        name,
        location,
        image,
        type,
        price,
        owner
      )
      return reply.send(newFiled)
    } catch (e) {
      return e
    }
  })

  fastify.delete('/:fieldId', async function (request, reply) {
    const { fieldId } = request.params
    try {
      const deletecField = await deleteField(fieldId)
      return reply.send(deletecField)
    } catch (e) {
      return e
    }
  })
}
