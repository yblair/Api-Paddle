'use strict'
const { Router } = require('express'); 
const router = Router();
const {
    getBookingsFields,
    setNewBooking,
    deleteBooking,
    getHours
  } = require('../../controllers/booking')


    router.get('/', async (request, reply) =>
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

    router.get('/hours', async (request, reply) =>
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

    router.post('/', async (request, reply) =>
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

    router.delete('/:idBooking', async (request,reply) =>
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

module.exports = router;
