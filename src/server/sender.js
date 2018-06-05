'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

function sendEmail(receiverEmail, text) {
    nodemailer.createTestAccount((err, account) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_USER_EMAIL,
                pass: process.env.SENDER_USER_PASS
            }
        });

        const mailOptions = {
            from: 'Clockwise Clockware', // sender address
            to: receiverEmail, // list of receivers
            subject: 'Clockwise clockware', // Subject line
            text: text, // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    });
}

module.exports = sendEmail;