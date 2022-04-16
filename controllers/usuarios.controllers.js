const { response } = require('express');
const { request } = require('express');
const bcrypt=require('bcryptjs');

const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios=async(req=request,res=response)=>{
    try{
        const usuarios=await Usuario.find({}, 'nombre email role google');
        res.json({
            ok:true,
            usuarios
            // uuid:req.uuid de la persona que hace la peticion
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const crearUsuario=async(req=request,res=response)=>{
    const {email, password, nombre}=req.body;
    try{
        const usuario=new Usuario(req.body);
        const existeEmail=await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:`El correo ${email} ya se encuentra registrado`
            });
        }
        // ENCRIPTAR CONTRASEÑA
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password, salt);
        // GUARDAR USUARIO
        await usuario.save();
        // CREAR TOKEN
        const token=await generarJWT(usuario.id);
        res.json({
            ok:true,
            msg:'Usuario creado',
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
}

const actualizarUsuario=async(req=request, res=response)=>{
    const uuid=req.params.id;
    try{
        const existeUsuarioDB=await Usuario.findById(uuid);
        if(!existeUsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:`No se encontró un usuario con id ${uuid}`
            });
        }
        // ACTUALIZACION
        const {password, google, email, ...campos}=req.body;
        if(existeUsuarioDB.email!==email){
            const existeEmail=await Usuario.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok:false,
                    msg:`Ya existe un usuario con el email ${req.body.email}`
                });
            }
        }
        campos.email=email;
        // BORRAR LOS QUE NO SE QUIEREN ACTUALIZAR
        // YA NO SE NECESITAN PORQEU SE EXTRAJERON DEL JSON
        // delete campos.password;
        // delete campos.google;
        // ACTUALIZAR USUARIO
        // const usuarioActualizado=await Usuario.findByIdAndUpdate(uuid, campos);
        const usuarioActualizado=await Usuario.findByIdAndUpdate(uuid, campos, {new:true});
        res.json({
            ok:true,
            msg:'Actualizado correctamente',
            usuario:usuarioActualizado
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const borrarUsuario=async (req=request, res=response)=>{
    const uuid=req.params.id;
    try{
        const existeUsuarioDB=await Usuario.findById(uuid);
        if(!existeUsuarioDB){
            return res.status(404).json({
                ok:false,
                msg:`No se encontró un usuario con id ${uuid}`
            });
        }
        await Usuario.findByIdAndDelete(uuid);
        res.json({
            ok:true,
            msg:`Usuario borrado exitosamente`
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}