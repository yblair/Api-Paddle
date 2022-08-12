'use strict'

const {
    getReviews,
    // registerReviews
} = require('../../controllers/reviews')

// A modo de prueba!!

module.exports = async function (fastify, opts) {
    fastify.get('/', async function(request, reply) {
        try {
            const reviews = await getReviews()
            return reply.send(reviews)
        }catch(e) {
            return e
        }
    });

    // fastify.post('/:id/reviews', async function(request, reply) {
    //     const {fieldId} = request.params
    //     try {
    //         const { rating, review } = request.body
             
    //         const newReviews = await registerReviews(fieldId, rating, review)
    //         return reply.send(newReviews)
    //     }catch(e) {
    //         return e
    //     }
    // })

}