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

], actualizarMedico);

router.delete('/:id', [
], borrarMedico);

module.exports=router;