const { response } = require("express");
const { request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT=(req=request, res=response, next)=>{
    // LEER TOKEN
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay un token en la peticion'
        });
    }
    try{
        const {uuid}=jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uuid=uuid;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        });
    }
};

module.exports={
    validarJWT
}