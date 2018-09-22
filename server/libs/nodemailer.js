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
        html:  `<html>   
        <div class="vc_row element-row row vc_custom_1478727859541">
            <div class="wpb_column vc_column_container vc_col-sm-12">
            <div class="wpb_wrapper">
            <div class=""
                        style="background-image:url(https://tvkirimure.tv.br/wp/wp-content/uploads/2018/08/emailfundo.png);
                        background-size:cover;
                        padding-top:40px;
                        padding-bottom:100px;
                        width:630px;
                        height:945px">
            <div class="row fw-content-wrap">
            <div class="col-12 nbm">
                <b><p class="" style="text-align: center;font-size: 30px;color:#0f0f37;margin-top: 10px;font-family:sans-serif;">Sua jornada está apenas começando</p></b>
                  <div id="learning-automated-div" style="text-align: center; font-size: 48px;
                    line-height: 52px; padding: 100px 5px 10px 5px; align-content: center; align-self: center;">
                    <div data-style="" class="wp2img" id="comp-jerdt3fyimg" style="position: relative; width: 343px; height: 153px;">
                     <!--<img id="comp-jerdt3fyimgimage" alt="" data-type="image" src="https://static.wixstatic.com/media/3353b3_00fbc8f648594f17b9854a40a5877d4a~mv2.png/v1/fill/w_330,h_147,al_c,lg_1/3353b3_00fbc8f648594f17b9854a40a5877d4a~mv2.png" style="width: 343px; height: 153px; object-fit: cover; margin-left: 50%;">-->
                </div>
            </div>
            <div style="margin-top:470px; text-align: center">
                    <p style="text-align: center">
                        <span style="color:#FFFFFF;">
                            <b><span style="font-size:37px;font-family:sans-serif;">Seu cadastro foi feito, agora você já faz parte da família.</span></b></p><br>
        </div>
            <div style="text-align: center">
                <a href=" https://www.instagram.com/interfy.brasil/?hl=pt-br" style="text-decoration: none;">
                     <span style="color:#FFFFFF;">
                            <b><span style="font-size:23px;font-family:sans-serif;">@interfy.brasil</span></span></a></b><br>
           
                        <a href="https://www.facebook.com/interfy.brasil" style="text-decoration: none;">
                        <span style="color:#FFFFFF;">
                                <b> <span style="font-size:23px;font-family:sans-serif;">fb.com/interfy.brasil</span></span></a></b><br>
                            </a>
           
                        <address> 
        
                                <a href="mailto:queroviajar@interfy.com.br" style="text-decoration:none";>
                                <span style="color:#FFFFFF;">
                                <b> <span style="font-size:23px;font-family:sans-serif;">queroviajar@interfy.com.br</b><br>
                                </a>
        
                        </address>
        
                       <a href="https://www.interfy.com.br/" style="text-decoration:none;"> <span style="color:#FFFFFF;">
                                <b> <span style="font-size:23px;font-family:sans-serif;">www.interfy.com.br</span></span></b></a><br>
        
                     </div>
            </div>
        </div>
    
    </div>
    <br>
    Por favor, clique no <a href=${process.env.URL}/users/confirm/${verificationCode}>link</a> para verificar seu e-mail!
    </html>` 
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
    const { User } = require('../models/User');
    
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