const { Router } =require('express');
const { check }=require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/', validarJWT, getHospitales);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').notEmpty(),
    validarCampos
], crearHospital);

router.put('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
    validarCampos,
], actualizarHospital);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], borrarHospital);

module.exports=router;