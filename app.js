'use strict'
require('./mongo')
const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports = async function (fastify, opts) {
  // Do not touch the following lines

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
