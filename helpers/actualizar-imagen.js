const Usuario=require('../models/usuario');
const Hospital=require('../models/hospital');
const Medico=require('../models/medico');
const fs=require('fs');

const borrarImagen=(path)=>{
    // const pathViejo=`./uploads/medicos/${medico.img}`;
    // console.log(fs.existsSync(pathViejo));
    // console.log(pathViejo);
    if(fs.existsSync(path)){
        // BORRAR LA IMAGEN ANTERIOR
        fs.unlinkSync(path);
    }
};

const actualizarImagen=async(tipo, id, nombreArchivo)=>{
    switch(tipo){
        case 'medicos':
            try{
                const medico=await Medico.findById(id);
                if(!medico){
                    console.log('No existe un medico con ese id');
                    return false;
                }
                const pathViejo=`./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo);
                medico.img=nombreArchivo;
                await medico.save();
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
            break;
        case 'hospitales':
            try{
                const hospital=await Hospital.findById(id);
                if(!hospital){
                    console.log('No existe un hospital con ese id');
                    return false;
                }
                const pathViejo=`./uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo);
                hospital.img=nombreArchivo;
                await hospital.save();
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
            break;
        case 'usuarios':
            try{
                const usuario=await Usuario.findById(id);
                if(!usuario){
                    console.log('No existe un usuario con ese id');
                    return false;
                }
                const pathViejo=`./uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
                usuario.img=nombreArchivo;
                await usuario.save();
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
            break;
        default:
            break;
    }
};

module.exports={
    actualizarImagen
}