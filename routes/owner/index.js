'use strict'
const { Router } = require('express'); 
const router = Router();
const {
  getAllOwners,
  getOwnerById,
  createOwner,
  deleteOwnerById,
  updatedOwner
} = require('../../controllers/owner')

require('dotenv')
const owner = require('../../models/Owner')

  router.get('/', async function (request, reply) {
    try {
      const owners = await getAllOwners()
      return reply.send(owners)
    } catch (e) {
      return reply.lo.error(e)
    }
  })

  router.get('/:ownerId', async function (request, reply) {
    const { ownerId } = request.params
    try {
      const owner = await getOwnerById(ownerId)
      return reply.send(owner)
    } catch (e) {
      return e
    }
  })

  router.post('/', async function (request, reply) {
    const { name, contact, email, username, password } = request.body
    try {
      const newOwner = await createOwner(
        name,
        contact,
        email,
        username,
        password
      )
      return reply.send({newOwner})
    } catch (e) {
      return e
    }
  })

  router.post("/login", async (request, reply) => {
    const{ email } = request.body;
    try{
      owner.findOne({email})
      .then(owner => {
        if(!owner) return reply.status(400).send({registered: false})
        reply.status(200).send({registered: true})
      })
    }catch (e) {
      return e
    }
  })

  router.delete('/:ownerId', async function (request, reply) {
    const { ownerId } = request.params
    try {
      const deletedOwner = await deleteOwnerById(ownerId)
      return reply.send(deletedOwner)
    } catch (e) {
      return e
    }
  })

  router.put('/:ownerId', async function (request, reply) {
    const { ownerId } = request.params
    const { password, username, contact } = request.body;
   try {
    const updateResult = await updatedOwner(ownerId, password, username, contact)
    return reply.send(updateResult)
   
   } catch (e) {
     return e
   }
  })

module.exports = router;

