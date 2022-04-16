const { Router } =require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { check }=require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('password', 'La contrseña es obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [
    validarJWT
], borrarUsuario);

module.exports=router;