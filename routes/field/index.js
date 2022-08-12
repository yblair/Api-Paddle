'use strict'
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter,
  filterByAvailability,
  sortFieldBy,
  searhcFieldByName,
  getPriceByRange,
  updateField,
  registerReviews,
  getReviews
} = require('../../controllers/field')
// const PadelField = require('../../models/PadelField')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const fields = await getAllFields()
      return reply.send(fields)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/typeField', async function (request, reply) {
    try {
      const { typeField } = request.query
      const bytype = await getTypeFieldsFilter(typeField)
      return reply.send(bytype)
    } catch (e) {
      return e
    }
  })

  fastify.get('/rangePrice', async function (request, reply) {
    try {
      const { minPrice, maxPrice } = request.query
      const applyFilter = await getPriceByRange(minPrice, maxPrice)
      return reply.send(applyFilter)
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
      const { price } = request.query
      const byprice = await sortFieldBy(price)
      return reply.send(byprice)
    } catch (e) {
      return e
    }
  })

  fastify.get('/able', async function (request, reply) {
    try {
      const { active } = request.query
      const able = await filterByAvailability(active)
      return reply.send(able)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/search', async function (request, reply) {
    try {
      const { name } = request.query
      const search = await searhcFieldByName(name)
      return reply.send(search)
    } catch (e) {
      return e
    }
  })

  fastify.put('/:fieldId', async function (request, reply) {
    const { fieldId } = request.params
    const { price, availability, image, name, location, type, horario } =
      request.body
    try {
      const updateResult = await updateField(
        fieldId,
        price,
        availability,
        image,
        name,
        location,
        type,
        horario
      )
      return reply.send(updateResult)
    } catch (e) {
      return e
    }
  })

  fastify.post('/reviews', async function (request, reply) {
    // const {fieldId} = request.params
    try {
      const { fieldId, rating, review } = request.body

      const newReviews = await registerReviews(fieldId, rating, review)
      return reply.send(newReviews)
    } catch (e) {
      return e
    }
  })

  fastify.get('/reviews', async function (request, reply) {
    try {
      const reviews = await getReviews()
      return reply.send(reviews)
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
