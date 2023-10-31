const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearEstablecimiento,
        obtenerEstablecimientos,
        obtenerEstablecimiento,
        actualizarEstablecimiento, 
        borrarEstablecimiento } = require('../controllers/establecimientos');
const { existeEstablecimientoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/establecimientos
 */

//  Obtener todas las Establecimientos - publico
router.get('/', obtenerEstablecimientos );

// Obtener una Establecimiento por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEstablecimientoPorId ),
    validarCampos,
], obtenerEstablecimiento );

// Crear Establecimiento - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('telefono','La direccion es obligatorio').not().isEmpty(),
    validarCampos
], crearEstablecimiento );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('telefono','La direccion es obligatorio').not().isEmpty(),
    check('id').custom( existeEstablecimientoPorId ),
    validarCampos
],actualizarEstablecimiento );

// Borrar una Establecimiento - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEstablecimientoPorId ),
    validarCampos,
],borrarEstablecimiento);



module.exports = router;