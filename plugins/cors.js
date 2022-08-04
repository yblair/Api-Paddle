'use strict'

const fp = require('fastify-plugin')


/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/cors'),{ 
    origin: '127.0.0.1:3000'
  })
})
