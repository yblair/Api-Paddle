'use strict'

require('dotenv').config();
const { USER_MAIL, PASS_MAIL } = process.env;
const nodemailer = require('nodemailer');

function createTrans()
{
    const transport = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:
            {
                user: USER_MAIL,
                pass: PASS_MAIL
            }
        });

    return transport;
}

async function sendMail(emailDestiny, body, subject)
{
    const transporter = createTrans();
    const info = await transporter.sendMail(
        {
            from: '"Padel Field" <pf.henry.padel@gmail.com>',
            to: emailDestiny,
            subject,
            html: body
        });

    console.log('Message sent: %s', info.messageId);
}

module.exports = {sendMail};