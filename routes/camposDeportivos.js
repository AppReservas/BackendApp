const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCampoDeportivos,
        obtenerCamposDeportivos,
        obtenerCampoDeportivo,
        actualizarCampoDeportivo, 
        borrarCampoDeportivo } = require('../controllers/camposDeportivos');
const { existeCampoDeportivoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/camposDeportivos
 */

//  Obtener todas las camposDeportivos - publico
router.get('/', obtenerCamposDeportivos );

// Obtener una CampoDeportivo por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCampoDeportivoPorId ),
    validarCampos,
], obtenerCampoDeportivo );

// Crear CampoDeportivo - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCampoDeportivo );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCampoDeportivoPorId ),
    validarCampos
],actualizarCampoDeportivo );

// Borrar una CampoDeportivo - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCampoDeportivoPorId ),
    validarCampos,
],borrarCampoDeportivo);



module.exports = router;