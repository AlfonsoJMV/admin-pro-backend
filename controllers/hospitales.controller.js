const { response, request } = require('express');
const Hospital=require('../models/hospital');

const getHospitales=async(req=request, res=response)=>{
    try{
        const hospitales=await Hospital.find().populate('usuario', 'nombre img');
        res.json({
            ok:true,
            hospitales
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const crearHospital=async(req=request, res=response)=>{
    const uuid=req.uuid;
    const hospital=new Hospital({
        usuario:uuid,
        ...req.body
    });
    try{
        const hospitalDB=await hospital.save();
        res.json({
            ok:true,
            msg:'Crear Hospital',
            hospital:hospitalDB
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const actualizarHospital=async(req=request, res=response)=>{
    const uuidHospital=req.params.id;
    const uuidUsuario=req.uuid;
    try{
        const hospitalDB=await Hospital.findById(uuidHospital);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:`No existe un hospital registrado con el id ${uuidHospital}`
            });
        }
        const data={
            usuario:uuidUsuario,
            ...req.body
        }
        const hospitalActualizado=await Hospital.findByIdAndUpdate(uuidHospital, data, {new:true})
        res.json({
            ok:true,
            msg:'Actualizar Hospital',
            hospitalActualizado
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const borrarHospital=async(req=request, res=response)=>{
    const uuid=req.params.id;
    try{
        const hospitalDB=await Hospital.findById(uuid);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:`No existe un hospital registrado con el id ${uuid}`
            });
        }
        await Hospital.findByIdAndDelete(uuid);
        res.json({
            ok:true,
            msg:'Hospital borrado exitosamente'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}