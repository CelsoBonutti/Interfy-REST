const mongoose = require('mongoose');
const validator = require('validator');

let IntercambioSchema = new mongoose.Schema({
    curso: {
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
        instituicao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instituicao',
            required: true
        },
        valor: {
            type: Number,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um valor válido.'
            },
            required: true
        }
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        validate:{
            validator: function(status){
                return (validator.isIn(status, ['processing', 'authorized', 'paid', 'refunded', 'waiting_payment', 'pending_refund', 'refused', 'chargedback']));
            }
        }
    },
    dataDeCompra:{
        type: Date,
        required: true,
        default: Date.now
    },
    transactionId:{
        type: Number,
        required: false
    }
})

IntercambioSchema.pre('validate', function(next){
    intercambio = this;
    if(intercambio.isNew){
        intercambio.dataDeCompra = Date.now;
        intercambio.status = 'processing';
        next();
    }
    next();
})

IntercambioSchema.post('save', function(next){
    intercambio = this;
    if (intercambio.status == 'paid'){
        let { Transporter } = require('../libs/nodemailer');
        Transporter.sendSoldExchangeMail(intercambio).then(()=>{
            next();
        })
    }
    else if (intercambio.status == 'refused'){
        let { Transporter } = require('../libs/nodemailer');
        Transporter.sendRefusedPaymentMail(intercambio).then(()=>{
            next();
        })
    }
})

IntercambioSchema.virtual.valorTotal = function () {
    let valor = this.curso.valor;
    this.adicionais.foreach(adicional => {
        valor += adicionais.valor;
    });
    return valor;
}

IntercambioSchema.statics.findByUserIdAndPopulate = function (_userId) {
    let Intercambio = this;

    return Intercambio.find({ _userId }).then().populate({
        path: 'instituicao',
        select: 'nome'
    })
}

IntercambioSchema.statics.exists = function(id){
    Intercambio = this;
    return Intercambio.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

let Intercambio = mongoose.model('Intercambio', IntercambioSchema);

module.exports = { Intercambio };