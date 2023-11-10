const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {obtenerCamposDeportivos, obtenerCampoDeportivo, crearCampoDeportivo, actualizarCampoDeportivo, borrarCampoDeportivo,} = require('../controllers/camposdeportivos');

const { existeEstablecimientoPorId, existeCampoDeportivoPorId, existeDeportePorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/camposdeportivos
 */

//Obtener todos los campos deportivos - publico
router.get('/', obtenerCamposDeportivos );

//Obtener un campo deportivo por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCampoDeportivoPorId),
    validarCampos,
], obtenerCampoDeportivo);

//Crear Campo deṕortivo - privado - persona admin con un token válido
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('establecimiento', 'No es un id de Mongo').isMongoId(),
    check('establecimiento').custom( existeEstablecimientoPorId),
    check('deporte', 'No es un id de Mongo').isMongoId(),
    check('deporte').custom( existeDeportePorId ),
    validarCampos
], crearCampoDeportivo);

//Actualizar campo deportivo - persona con rol admin con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCampoDeportivoPorId),
    validarCampos
], actualizarCampoDeportivo);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCampoDeportivoPorId),
    validarCampos
], borrarCampoDeportivo);

module.exports = router;


