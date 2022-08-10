'use strict'
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser
} = require('../../controllers/user')
const { pagination } = require('../../utils/pagination')
const bcrypt = require("bcrypt")
require('dotenv')
const user = require('../../models/User')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const { page, limit } = request.query
      const users = await getAllUsers()
      const result = pagination(users, page, limit)
      return reply.send(result)
    } catch (e) {
      return reply.log.error(e)
    }
  })

  fastify.get('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const user = await getUserById(userId)
      return reply.send(user)
    } catch (e) {
      return e
    }
  })

  fastify.post('/', async function (request, reply) {
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

      const token = fastify.jwt.sign({ newUser })

      return reply.send({newUser, token})
    } catch (e) {
      return e
    }
  })


  fastify.post('/login', function(request, reply){
    const{ email, password} = request.body
    try{
      user.findOne({email})
      .then(user => {
        if (!user) return reply.status(400).send({ msg: "User not exist" })
        bcrypt.compare(password, user.password, (err, data) => {
            if (err) throw err
            if (data) {
              const userId = data.id;
              const accessToken = fastify.jwt.sign({ userId })
              return reply.status(200).send({ msg: "Login success", accessToken })
            } else {
              return reply.status(401).send({ msg: "Invalid credencial" })
            }
        })
    })

    // -------REFERENCE -----//
//     const verificacion = express.Router();
// verificacion.use((req, res, next) => { // middleware
//     let token = req.headers['x-access-token'] || req.headers['authorization']
//     if(!token){
//         res.status(401).send({
//             error: "Token is necessary"
//         })
//         return
//     }
//     if (token.startsWith("Bearer ")){
//         token = token.slice(7, token.length)
//         console.log(token)
//     }
//     if(token){
//         jwt.verify(token, server.get("key"), (error, decoded) => {
//             if(error){
//                 return res.json({
//                     message: "EL TOKEN NO ES VÁLIDO"
//                 })
//             }else{
//                 req.decoded = decoded;
//                 next()
//             }
//         })
//     }
// })
    // -------REFERENCE -----//

      // bcrypt.compare(password, foundUser.password, function(err, data, reply) {
      //   if(err){
      //     throw err
      //   } if(data) {
      //     const  userid  = foundUser.id
      //    const accessToken = fastify.jwt.sign({ userid })
      //    return accessToken;
      //   }
      //   else {
      //     return reply.status(401).json({ msg: "Invalid credencial" })
      //   }});
        
      } 
    catch(err){
      reply.send(err, "este errawr")
    }
  })

  fastify.delete('/:userId', async function (request, reply) {
    const { userId } = request.params
    try {
      const deletedUser = await deleteUserById(userId)
      return reply.send(deletedUser)
    } catch (e) {
      return e
    }
  })

  fastify.put('/:userId', async function (request, reply) {
    const { userId } = request.params
    const { password, contact, username } = request.body;
   try {
    const updateResult = await updateUser(userId, password, username, contact)
    return reply.send(updateResult)
   
   } catch (e) {
     return e
   }
 })
}