const { Router } =require('express');
const { check }=require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico }=require('../controllers/medicos.controller')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/', validarJWT, getMedicos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').notEmpty(),
    validarCampos,
    check('hospital', 'No es un id de mongo válido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
    check('nombre', 'El nombre del médico es necesario').notEmpty(),
    validarCampos,
    check('hospital', 'No es un id de mongo válido, revisar hospital').isMongoId(),
    validarCampos,
], actualizarMedico);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], borrarMedico);

module.exports=router;