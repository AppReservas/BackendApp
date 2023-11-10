const { response } = require('express');
const { Establecimiento } = require('../models');


const obtenerEstablecimientos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, establecimientos ] = await Promise.all([
        Establecimiento.countDocuments(query),
        Establecimiento.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        establecimientos
    });
}

const obtenerEstablecimiento = async(req, res = response ) => {

    const { id } = req.params;
    const establecimiento = await Establecimiento.findById( id )
                            .populate('usuario', 'nombre');

    res.json( establecimiento );

}

const crearEstablecimiento = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const establecimientoDB = await Establecimiento.findOne({ nombre });
    // const establecimientoDB2 = await Establecimiento.findOne({ telefono });

    if ( establecimientoDB ) {
        return res.status(400).json({
            msg: `El establecimiento ${ establecimientoDB.nombre }, ya existe`
        });
    }
    // if ( establecimientoDB ) {
    //     return res.status(400).json({
    //         msg: `El establecimiento ${ establecimientoDB.telefono }, ya existe`
    //     })
    // }

    // Generar la data a guardar
    const data = {
        nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        usuario: req.usuario._id
    }

    const establecimiento = new Establecimiento( data );

    // Guardar DB
    await establecimiento.save();

    res.status(201).json(establecimiento);

}

const actualizarEstablecimiento = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.telefono;
    data.direccion;
    data.usuario = req.usuario._id;

    const establecimiento = await Establecimiento.findByIdAndUpdate(id, data, { new: true });

    res.json( establecimiento );

}

const borrarEstablecimiento = async(req, res =response ) => {

    const { id } = req.params;
    const establecimientoBorrado = await Establecimiento.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( establecimientoBorrado );
}




module.exports = {
    crearEstablecimiento,
    obtenerEstablecimientos,
    obtenerEstablecimiento,
    actualizarEstablecimiento,
    borrarEstablecimiento
}