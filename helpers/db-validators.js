const Role = require('../models/role');
const { Usuario, Categoria, Producto, Establecimiento, CampoDeportivo } = require('../models');

const esRoleValido = async(rol = 'USER_ROLE') => {

    const existeRol = await Role.findOne({ rol });
    

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {

    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
/**
 * Establecimientos
 */
const existeEstablecimientoPorId = async( id ) => {

    // Verificar si el establecimiento exitste
    const existeEstablecimiento = await Establecimiento.findById(id);
    if ( !existeEstablecimiento ){
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el producto existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Escenarios Deportivos
 */
const existeCampoDeportivoPorId = async( id ) => {

    // Verificar si el producto existe
    const existeCampoDeportivo = await CampoDeportivo.findById(id);
    if ( !existeCampoDeportivo ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeEstablecimientoPorId,
    existeCategoriaPorId,
    existeCampoDeportivoPorId,
    existeProductoPorId,
    coleccionesPermitidas
}