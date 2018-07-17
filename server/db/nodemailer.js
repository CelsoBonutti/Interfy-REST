var nodemailer = require('nodemailer');

var Transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USR,
        pass: process.env.MAIL_PWD
    }
})

module.exports = { Transporter }