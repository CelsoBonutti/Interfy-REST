let nodemailer = require('nodemailer');

let Transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USR,
        pass: process.env.MAIL_PWD
    }
})

Transporter.sendVerificationMail = function (email, verificationCode) {
    let mailBody = {
        from: `"Interfy" <${process.env.MAIL_USR}>`,
        to: email,
        subject: 'Interfy: Verifique seu e-mail!',
        html: `Olá!,<br> Por favor, clique no <a href=${process.env.URL}/users/confirm/${verificationCode}>link</a> para verificar seu e-mail!<br>`
    }

    Transporter.sendMail(mailBody);
}

Transporter.sendSoldExchangeMail = function(intercambio){
    let mailBody = {
        from: `"Interfy" <${process.env.MAIL_USR}>`,
        to: email,
        subject: 'VENDEU CARALHO',
        html: `Nando, Pedro
        Vendemos um intercâmbio, porra!
        Isso mesmo, caralho, o pagamento foi aprovado!`
    }

    Transporter.sendMail(mailBody);
}

Transporter.sendRefusedPaymentMail = function(intercambio){
    const { User } = require('../models/user');
    
    User.findById(intercambio._userId).then((user)=>{
        let mailBody = {
            from: `"Interfy" <${process.env.MAIL_USR}>`,
            to: email,
            subject: 'Interfy: Seu pagamento foi recusado.',
            html: `Olá, ${user.name} ${user.surname}.
            Infelizmente, o pagamento de seu intercâmbio não pode ser aprovado.`
        }
    })

    Transporter.sendMail(mailBody);
}

module.exports = { Transporter };