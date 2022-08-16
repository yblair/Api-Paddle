const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/root')
const cors = require('cors')
// const path = require('path')
const PORT = process.env.PORT || 3000;
require('./mongo.js')

const server = express()

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PadelApp API',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3000' }]
  }
}

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml']
}

const swaggerSpec = swaggerJsDoc(options)

server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


server.name = 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use(cors())
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

// port
server.listen(PORT, () => {
  console.log('%s listening at 3000') // eslint-disable-line no-console
})

module.exports = server
