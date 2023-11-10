const { response } = require('express');
const { CampoDeportivo } =  require('../models');

const obtenerCamposDeportivos = async( req, res = response ) => {
    
    const { limte = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, camposdeportivos ] = await Promise.all([
        CampoDeportivo.countDocuments(query),
        CampoDeportivo.find(query)
            .populate('usuario', 'nombre')
            .populate('establecimiento', 'nombre')
            .populate('deporte', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limte ))
    ]);

    res.json({
        total,
        camposdeportivos
    });
}

const obtenerCampoDeportivo = async( req, res = response ) => {
    const { id } = req.params;
    const campoDeportivo = await CampoDeportivo.findById( id )
                                    .populate('usuario', 'nombre')
                                    .populate('establecimiento', 'nombre')
                                    .populate('deporte', 'nombre');
    res.json(campoDeportivo);
}

const crearCampoDeportivo = async( req, res = response ) => {
    
    const { estado, usuario, ...body} = req.body;
    const campoDeportivoDB = await CampoDeportivo.findOne({ nombre: body.nombre.toUpperCase() });

    if ( campoDeportivoDB ) {
        return res.status(400).json({
            msg: `El esceneario deportivo ${ campoDeportivoDB.nombre }, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const campoDeportivo = new CampoDeportivo( data );

    const nuevoCampoDeportivo = await campoDeportivo.save();
    await nuevoCampoDeportivo
        .populate('usuario', 'nombre')
        .populate('establecimiento', 'nombre')
        .populate('deporte', 'nombre')
        .execPopulate();
    res.status(201).json( nuevoCampoDeportivo );
}

const actualizarCampoDeportivo = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const campoDeportivo = await CampoDeportivo.findByIdAndUpdate(id, data, {new: true });

    await campoDeportivo
        .populate('usuario', 'nombre')
        .populate('establecimiento', 'nombre')
        .populate('deporte', 'nombre')
        .execPopulate();
    res.json( campoDeportivo );
}

const borrarCampoDeportivo = async( req, res = response ) => {

    const { id } = req.params;
    const campoDeportivoBorrado = await CampoDeportivo.findByIdAndUpdate( id, {estado: false}, {new: true});

    res.json(campoDeportivoBorrado);
}

module.exports = {
    crearCampoDeportivo,
    obtenerCampoDeportivo,
    obtenerCamposDeportivos,
    actualizarCampoDeportivo,
    borrarCampoDeportivo
}