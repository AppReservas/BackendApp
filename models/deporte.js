const { Schema, model } = require('mongoose');

const DeporteSchema = Schema({
    deporte: {
        type: String,
        required: [true, 'El nombre es obiligatorio'],
    }
});

module.exports = model( 'Deporte', DeporteSchema );