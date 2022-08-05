'use strict'
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter,
  filterByAvailability,
  sortFieldBy,
  searhcFieldByName
} = require('../../controllers/field')
const { pagination } = require('../../utils/pagination')
// const PadelField = require('../../models/PadelField')

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
      const { typeField, page, limit } = request.query
      const bytype = await getTypeFieldsFilter(typeField)
      const result = pagination(bytype, page, limit)
      return reply.send(result)
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

  fastify.get('/sort', async function (request, reply) {
    try {
      const {price, page, limit } = request.query
      const byprice = await sortFieldBy(price)
      const result = pagination(byprice, page, limit)
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.get('/able', async function (request, reply) {
    try {
      const {active, page, limit } = request.query
      const able = await filterByAvailability(active)
      const result = pagination(able, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/search', async function (request, reply) {
    try {
      const { name, page, limit } = request.query
      const search = await searhcFieldByName(name);
      const result = pagination(search, page, limit)
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  /*  
  TODO: necesitamos realizar un metodo para poder alternar entre no/disponible
        
  fastify.put('/:fieldId', async function (request, reply) {
    const MESSAGE = 'Field availability change'
    try {
      const { fieldId } = request.params
      await PadelField.findByIdAndUpdate(fieldId, {
        availability: 
      })
      return MESSAGE
    } catch (e) {
      return e
    }
  }) */
}
