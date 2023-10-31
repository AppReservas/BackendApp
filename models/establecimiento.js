const { Schema, model} = require('mongoose');

const EstablecimientoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obiligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    
});

module.exports = model(' Establecimiento', EstablecimientoSchema);  