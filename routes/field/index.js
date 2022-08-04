'use strict'
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter
} = require('../../controllers/field')
const { pagination } = require('../../utils/pagination')
const PadelField = require('../../models/PadelField')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const { page, limit } = request.query
      const fields = await getAllFields()
      const result = pagination(fields, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/typeField', async function (request, reply) {
    try {
      const { typeField } = request.query
      const typeFields = await getTypeFieldsFilter(typeField)
      return reply.send(typeFields)
    } catch (e) {
      return e
    }
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
    const { name, location, image, type, price, ownerId } = request.body
    try {
      const newFiled = await registerField(
        name,
        location,
        image,
        type,
        price,
        ownerId
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

  fastify.get('/sort', async function (_, reply) {
    try {
      const result = await PadelField.find({ isActive: true }).sort({
        price: -1
      })
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.get('/able', async function (_, reply) {
    try {
      const result = await PadelField.find({
        isActive: true,
        availability: true
      })
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.get('/search', async function (request, reply) {
    try {
      const { name } = request.query
      const result = await PadelField.find({
        isActive: true,
        name: { $regex: name, $options: 'i' }
      })
      console.log(result)
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.put('/:fieldId', async function (request, reply) {
    const MESSAGE = 'Field availability change'
    try {
      const { fieldId } = request.params
      await PadelField.findByIdAndUpdate(fieldId, {})
      return MESSAGE
    } catch (e) {
      return e
    }
  })
}
