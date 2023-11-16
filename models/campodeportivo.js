const { Schema, model } = require('mongoose');

const CampoDeportivoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    deporte: {
        type: Schema.Types.ObjectId,
        ref: 'Deporte',
        required: true
    },
    establecimiento: {
        type: Schema.Types.ObjectId,
        ref: 'Establecimiento',
        required: true
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad de la cancha es necesaria'],
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required:true
    },
    fechacreacion: {
        type: Date,
        default: Date.now
    }
});

CampoDeportivoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'CampoDeportivo', CampoDeportivoSchema );