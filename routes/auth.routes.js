const { Router } =require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router=Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos,
], login);

module.exports=router;