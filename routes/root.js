'use strict'

const User = require('../schema/user')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const users = await User.find()
    return users
  })

  fastify.post('/', async function (request, reply) {
    const { userName } = request.body
    const user = await User.create({
      userName,
      email: `${userName}@test.io`
    })
    return user
  })
}
