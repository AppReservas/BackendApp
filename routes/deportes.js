const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { createDeporte,
        getDeporteById,
        getDeportes } = require('../controllers/deportes');
const { existeDeportePorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getDeportes);

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeDeportePorId ),
    validarCampos
], getDeporteById);

router.post('/', [
    validarJWT,
    check('deporte','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createDeporte );

module.exports = router;