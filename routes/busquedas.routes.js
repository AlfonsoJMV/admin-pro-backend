const { Router } =require('express');
const { check }=require('express-validator');
const { getTodo, getTodoColeccion } = require('../controllers/busquedas.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getTodoColeccion);

module.exports=router;