'use strict'
const { Router } = require('express'); 
const router = Router();
const {
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter,
  filterByAvailability,
  sortFieldBy,
  searhcFieldByName,
  getPriceByRange
} = require('../../controllers/field')
const { pagination } = require('../../utils/pagination')
// const PadelField = require('../../models/PadelField')
// const {jwtCheck} = require("../../middleware/middleware")

  router.get('/', async function (request, reply) {
    try {
      const { page, limit } = request.query
      const fields = await getAllFields()
      const result = pagination(fields, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  router.get('/typeField', async function (request, reply) {
    try {
      const { typeField, page, limit } = request.query
      const bytype = await getTypeFieldsFilter(typeField)
      const result = pagination(bytype, page, limit)
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  router.get('/rangePrice', async function (request, reply)
  {
    try
    {
      const {minPrice, maxPrice, page, limit} = request.query;
      const applyFilter = await getPriceByRange(minPrice, maxPrice);
      const result = pagination(applyFilter, page, limit)
      return reply.send(result);
    }
    catch(e)
    {
      return e;
    }
  })

  router.get('/:filedId', async function (request, reply) {
    const { filedId } = request.params
    try {
      const field = await getFieldById(filedId)
      return reply.send(field)
    } catch (e) {
      return e
    }
  })

  router.post('/', async function (request, reply) {
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

  router.delete('/:fieldId', async function (request, reply) {
    const { fieldId } = request.params
    try {
      const deletecField = await deleteField(fieldId)
      return reply.send(deletecField)
    } catch (e) {
      return e
    }
  })

  router.get('/sort', async function (request, reply) {
    try {
      const {price, page, limit } = request.query
      const byprice = await sortFieldBy(price)
      const result = pagination(byprice, page, limit)
      return reply.send(result)
    } catch (e) {
      return e
    }
  })

  router.get('/able', async function (request, reply) {
    try {
      const {active, page, limit } = request.query
      const able = await filterByAvailability(active)
      const result = pagination(able, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  router.get('/search', async function (request, reply) {
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
        
  router.put('/:fieldId', async function (request, reply) {
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

  module.exports = router;
