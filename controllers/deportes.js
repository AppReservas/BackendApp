const { response } = require('express');
const { Deporte } = require('../models');

const getDeportes = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    
    const [ total, deportes ] = await Promise.all([
        Deporte.find()
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        deportes
    });
}

const getDeporteById = async(req, res = response) => {

    const { id } = req.params;
    const deporte = await Deporte.findById( id );

    res.json( deporte )
}

const createDeporte = async( req, res = response) => {
    const nombre = req.body.deporte.toUpperCase();

    const deporteDB = await Deporte.findOne({nombre});

    if ( deporteDB ){
        return res.status(400).json({
            msg: `El deporte ${ deporteDB.deporte }, ya existe`
        });
    }

    const data = {
        deporte: nombre 
    }
    const deporte = new Deporte( data );

    await deporte.save();

    res.status(201).json(deporte);
}

module.exports = {
    getDeporteById,
    getDeportes,
    createDeporte
}
