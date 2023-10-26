const { response } = require('express');
const { CamposDeportivos } = require('../models');


const obtenerCamposDeportivos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, camposDeportivos ] = await Promise.all([
        CamposDeportivos.countDocuments(query),
        CamposDeportivos.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        camposDeportivos
    });
}

const obtenerCampoDeportivo = async(req, res = response ) => {

    const { id } = req.params;
    const campoDeportivo = await CamposDeportivos.findById( id )
                            .populate('usuario', 'nombre');

    res.json( campoDeportivo );

}

const crearCampoDeportivo = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const campoDeportivoDB = await CamposDeportivos.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La campoDeportivo ${ campoDeportivoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const campoDeportivo = new CamposDeportivos( data );

    // Guardar DB
    await campoDeportivo.save();

    res.status(201).json(campoDeportivo);

}

const actualizarCampoDeportivo = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const campoDeportivo = await CamposDeportivos.findByIdAndUpdate(id, data, { new: true });

    res.json( campoDeportivo );

}

const borrarCampoDeportio = async(req, res =response ) => {

    const { id } = req.params;
    const campoDeportivoBorrada = await CamposDeportivos.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( campoDeportivoBorrada );
}




module.exports = {
    crearCampoDeportivo,
    obtenerCamposDeportivos,
    obtenerCampoDeportivo,
    actualizarCampoDeportivo,
    borrarCampoDeportio
}