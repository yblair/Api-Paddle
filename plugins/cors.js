'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/cors'), {
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
})
