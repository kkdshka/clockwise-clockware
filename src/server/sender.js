'use strict';
const nodemailer = require('nodemailer');

function sendEmail(receiverEmail, reservationData) {
    const text = 'Ваш заказ на ремонт часов принят. Ожидайте мастера ' + reservationData.date
        + ' в ' + reservationData.time + '.';
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cklockware@gmail.com',
                pass: 'passwordsecret'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'Clockwise Clockware', // sender address
            to: receiverEmail, // list of receivers
            subject: 'Clockwise clockware', // Subject line
            text: text, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

module.exports = sendEmail;