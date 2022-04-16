const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login=async(req=request, res=response)=>{
    const {email, password}=req.body;
    try{
        const usuarioDB=await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Credenciales incorrectas, email'
            });
        }
        // VALIDAR CONTRASEÑA
        const validPassword=bcryptjs.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Credenciales incorrectas, password'
            });
        }
        // GENERAR EL TOKEN
        const token=await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

module.exports={
    login
}