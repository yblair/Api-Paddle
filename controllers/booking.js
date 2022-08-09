const Booking = require('../models/booking');

const horarios = [9,10,11,12,13,14,15,16,17,18];
// comentario

async function getBookingsFields(idField)
{
    try
    {
        const bookings = await Booking.find(
            {
                isActive: true,
                idField
            })
        return bookings;
    }
    catch(e)
    {
        return e;
    }
}

async function setNewBooking(idUser, idField, date)
{
    try
    {
        const newBooking = await Booking.create(
            {
                idUser,
                idField,
                date,
                isActive: true
            });

        return newBooking;
    }
    catch(e)
    {
        return e;
    }
}

async function deleteBooking(idBooking)
{
    try
    {
      const deletedBooking = await Booking.findByIdAndUpdate(idBooking,
        {
            isActive: false
        });

      return deletedBooking;
    }
    catch(e)
    {
      return e
    }
}

async function getHours(idField, day)
{
    try
    {
        const bookings = await Booking.find(
            {
                isActive: true,
                idField
            })

        const arr = bookings.map(el =>
            {
                return {
                    idField: el.idField,
                    day: el.date.toString().slice(4,15),
                    hour: el.date.toString().slice(16,18)
                }
            });

        const filter = arr.map(el =>
            {
                if(el.day === day)
                    return Number(el.hour);
                return null;
            });

        const filter2 = filter.filter(el => el !== null);

        const horarioFinal = [];

        for(let i = 0;i<horarios.length; i++)
        {
            if(!filter2.includes(horarios[i])) horarioFinal.push(horarios[i]);
        }

        return horarioFinal;
    }
    catch(e)
    {
        return e;
    }
}

module.exports = { getBookingsFields, setNewBooking, deleteBooking, getHours }
