'use strict'
const {
    getBookingsFields,
    setNewBooking,
    deleteBooking,
    getHours
  } = require('../../controllers/booking')

module.exports = async function (fastify, opts)
{
    fastify.get('/', async (request, reply) =>
    {
        try
        {
            const { idField} = request.query;
            const result = await getBookingsFields(idField);

            return reply.send(result);
        }
        catch(e)
        {
            return e;
        }
    });

    fastify.get('/hours', async (request, reply) =>
    {
        try
        {
            const {idField, day} = request.query;
            const result = await getHours(idField, day);

            return reply.send(result);
        }
        catch(e)
        {
            return e;
        }
    })

    fastify.post('/', async (request, reply) =>
    {
        try
        {
            const {idUser, idField, date} = request.body;
            const result =  await setNewBooking(idUser, idField, date);

            return reply.send(result);
        }
        catch(e)
        {
            return e;
        }
    });

    fastify.delete('/:idBooking', async (request,reply) =>
    {
        try
        {
            const { idBooking} = request.params;
            const result = await deleteBooking(idBooking);

            return reply.send(result);
        }
        catch(e)
        {
            return e;
        }
    })
}