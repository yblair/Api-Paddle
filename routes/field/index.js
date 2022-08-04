'use strict'
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields
} = require('../../controllers/field')
const PadelField = require('../../models/PadelField')

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
    const { name, location, image, type, price, owner,availability } = request.body
    try {
      const newFiled = await registerField(
        name,
        location,
        image,
        type,
        price,
        owner,
        availability
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

  fastify.get('/price', async function (request, reply) {
    try {
      const {sort} = request.query
      const result = await PadelField.find({ isActive: true }).sort({ price: sort })
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.get('/able', async function (request, reply) {
    try {
      const {active} = request.query
      const result = await PadelField.find({
        isActive: true,
        availability: active
      })
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  fastify.get('/search', async function(request, reply) {
    try{
      const { name } = request.query
      const result = await PadelField.find({ isActive: true, name: { $regex: name, $options: 'i' } })
      console.log(result)
      return reply.send(result)
    }catch(e){
      return e
    }
  })
}
