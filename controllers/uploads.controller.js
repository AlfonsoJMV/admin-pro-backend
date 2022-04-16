const { response } = require("express");
const { request } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path=require('path');
const fs=require('fs');

const fileUpload=(req=request, res=response)=>{
    try{
        const tipo=req.params.tipo;
        const id=req.params.id;
        const tiposValidos=['hospitales', 'medicos', 'usuarios'];
        const extensionesValidas=['png', 'jpg', 'jpeg', 'gif'];
        // VALIDAR TIPO
        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok:false,
                msg:`Tipo ${tipo} no es una coleccion válida`
            });
        }
        // VALIDAR QUE EXISTA UN ARCHIVO
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok:false,
                msg:`No hay ningún archivo`
            });
        }
        // PROCESAR LA IMAGEN ID UNICO, COLOCARLA EN LA CARPETA QUE CORRESPONDE
        // EXTRAER EXTENSION DE LA IMAGEN, ETC
        const file=req.files.imagen;
        const nombreCortado=file.name.split('.'); //wolverine.1.3.jpg
        const extensionArchivo=nombreCortado[nombreCortado.length-1];
        // VALIDAR EXTENSION
        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:`El archivo no tiene una extensión permitida, solo ${extensionesValidas}`
            });
        }
        // GENERAR EL UUID DE NOMBRE DE LA IMAGEN
        const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;
        // PATH PARA GUARDAR LA IMAGEN
        const path=`./uploads/${tipo}/${nombreArchivo}`;
        // MOVER LA IMAGEN AL PATH
        file.mv(path, (err)=>{
            if (err){
                console.log(error);
                res.status(500).json({
                    ok:false,
                    msg:'Error al mover la imagen'
                });
            }
            // ACTUALIZAR BASE DE DATOS
            actualizarImagen(tipo, id, nombreArchivo);
            res.json({
                ok:true,
                msg:'File Upload',
                nombreArchivo
            });
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const retornaImagen=(req=request, res=response)=>{
    try{
        const tipo=req.params.tipo;
        const foto=req.params.foto;
        const pathImg=path.join(__dirname, `../uploads/${tipo}/${foto}`);
        // IMAGEN POR DEFECTO
        if(fs.existsSync(pathImg)){
            res.sendFile(pathImg);
        }else{
            res.sendFile(path.join(__dirname, `../uploads/no-img.jpg`));
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

module.exports={
    fileUpload,
    retornaImagen
}