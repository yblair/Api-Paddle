'use strict'

require('dotenv').config();
const request = require('request');
const { Router } = require('express');
const { CLIENT, SECRET } = process.env;

const router = Router();
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const auth = {user: CLIENT, pass: SECRET};

router.post('/createPayment', (req, res)=>
{
    try
    {
        const {idField, cost} = req.body;
        const body =
        {
            intent: 'CAPTURE',
            purchase_units:
            [
                {
                    amount:
                    {
                        currency_code: 'USD',
                        value: cost
                    }
                }
            ],
            application_context:
            {
                brand_name: 'Padel Field',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `http://localhost:5173/detail/${idField}`,
                cancel_url: `http://localhost:5173/detail/${idField}`
            }
        };

        request.post(`${PAYPAL_API}/v2/checkout/orders`,
        {
            auth,
            body,
            json: true
        },
        (_err, response) =>
        {
            if(!_err) res.send(response.body.links[1].href);
            else res.send(response.body);
        })
    }
    catch(e)
    {
        return e;
    }
});

router.get('/executePayment', (req, res) =>
{
    try
    {
        const token = req.query.token;

        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {
            auth,
            body: {},
            json: true
        },
        (_err, response) =>
        {
            if(!_err) res.send({msg: 'Payment has been succesfull'});
            else res.send({err: 'Payment has been rejected'});
        })
    }
    catch(e)
    {
        return e;
    }
});

module.exports = router;