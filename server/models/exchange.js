const mongoose = require('mongoose');
const validator = require('validator');

let ExchangeSchema = new mongoose.Schema({
    course: {
        tipo: {
            type: String,
            required: true
        },
        cargaHoraria: {
            type: String,
            required: true
        },
        turno: {
            type: String,
            required: true
        },
        qntSemanas: {
            type: Number,
            required: true
        },
        dtInicio: {
            type: Date,
            required: true
        },
        dtFim: {
            type: Date,
            required: true
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        valor: {
            type: String,
            validate: {
                validator: function(){
                    return validator.isCurrency(this.price);
                },
                message: '{VALUE} não é um valor válido.'
            },
            required: true
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['processing', 'authorized', 'paid', 'refunded', 'waiting_payment', 'pending_refund', 'refused', 'chargedback']
    },
    purchaseDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate:{
        type: Date,
        required: true
    },
    transactionId:{
        type: Number,
        required: false
    }
})

ExchangeSchema.pre('validate', function(next){
    exchange = this;
    if(exchange.isNew){
        exchange.dataDeCompra = Date.now;
        exchange.status = 'processing';
        next();
    }
    updateDate = Date.now;
    next();
})

ExchangeSchema.post('save', function(next){
    exchange = this;
    if (exchange.status == 'paid'){
        let { Transporter } = require('../libs/nodemailer');
        Transporter.sendSoldExchangeMail(exchange).then(()=>{
            next();
        })
    }
    else if (exchange.status == 'refused'){
        let { Transporter } = require('../libs/nodemailer');
        Transporter.sendRefusedPaymentMail(exchange).then(()=>{
            next();
        })
    }
})

ExchangeSchema.statics.findByUserIdAndPopulate = function (userId) {
    let Exchange = this;

    return Exchange.find({ userId }).then().populate({
        path: 'School',
        select: 'nome'
    })
}

let Exchange = mongoose.model('Exchange', ExchangeSchema);

module.exports = { Exchange };