'use strict'
const { Router } = require('express'); 
const router = Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser
} = require('../../controllers/user')

require('dotenv')
const user = require('../../models/User')
const {tokenGenerator} = require("../../controllers/tokenGenerator")
const jwtCheck = require("../../middleware/middleware")
const bcrypt = require("bcrypt")

  router.get('/', async function (request, reply) {
    try {
      const users = await getAllUsers()
      return reply.send(users)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  router.get('/info', jwtCheck, async (request, reply) => {
    try{
      reply.status(200).send("SUCCESSFULLY CONNECTED")
      } 
    catch(err){
      reply.send({msg: "Unathorized"})
    }
  })

  router.get('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const user = await getUserById(userId)
      return reply.send(user)
    } catch (e) {
      return e
    }
  })

  router.post('/', async function (request, reply) {
    const { username, name, lastName, contact, email, password } = request.body
    try {
      const newUser = await createUser(
        username,
        name,
        lastName,
        contact,
        email,
        password
      )
       const token = tokenGenerator({newUser})

      return reply.send({ newUser, token })
    } catch (e) {
      return e
    }
  })

  router.post("/login", async (request, reply) => {
    const{ email, password } = request.body;
    if(!email || !password) return reply.status(400).json({msg: "email and password are required"})
    try{
      user.findOne({email})
      .then(user => {
        if (!user) return reply.status(400).send({ msg: "User not exist" })
        bcrypt.compare(password, user.password, (err, data) => {
            if (err) throw err
            if (data) {
              const accessToken = tokenGenerator({"userId": data.id})
              return reply.status(200).send({ msg: "Login success", accessToken })
            } else {
              return reply.status(401).send({ msg: "Invalid credencial" })
            }
        })
    })
    } 
    catch(err){
      reply.send(err, "este errawr")

    }
  })
  

  router.delete('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const deletedUser = await deleteUserById(userId)
      return reply.send(deletedUser)
    } catch (e) {
      return e
    }
  })


  router.put('/:userId', async function (request, reply) {
    const { userId } = request.params
    const { password, contact, username } = request.body
    try {
      const updateResult = await updateUser(userId, password, username, contact)
      return reply.send(updateResult)
    } catch (e) {
      return e
    }
  })

module.exports = router;
