const jwt=require('jsonwebtoken');

const generarJWT=(uuid)=>{
    return new Promise((resolve, reject)=>{
        const payload={
            uuid
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn:'12h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el jwt');
            }else{
                resolve(token);
            }
        });
    });
};

module.exports={
    generarJWT
}