'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (_, reply) {
    return reply.send({ root: 'true' })
  })
}
