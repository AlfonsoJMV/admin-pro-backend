const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn=async(req=request, res=response)=>{
    const googleToken=req.body.token;
    try{
        const {name, email, picture}=await googleVerify(googleToken);
        const usuarioDB=await Usuario.findOne({email});
        let usuario;
        if(!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            });
        }else{
            // EXISTE EL USUARIO
            usuario=usuarioDB;
            usuario.google=true;
            usuario.password='@@@';
        }
        // GUARDAR EN BD
        await usuario.save();
        // GENERAR EL TOKEN
        const token=await generarJWT(usuario.id);
        res.json({
            ok:true,
            token
        });
    }catch(error){
        console.log(error);
        res.status(401).json({
            ok:true,
            msg:'El token no es correcto'
        });
    }
};

const renewToken=async(req=request, res=response)=>{
    const uuid=req.uuid;
    // GENERAR EL TOKEN
    const token=await generarJWT(uuid);
    res.json({
        ok:true,
        token
    })
};

module.exports={
    login,
    googleSignIn,
    renewToken
}