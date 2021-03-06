const { response, request } = require('express');
const Hospital = require('../models/hospital');
const Medico=require('../models/medico');

const getMedicos=async(req=request, res=response)=>{
    try{
        const medicos=await Medico.find()
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre img');
        res.json({
            ok:true,
            medicos
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const crearMedico=async(req=request, res=response)=>{
    const uuid=req.uuid;
    const hospital=req.body.hospital;
    const medico=new Medico({
        usuario:uuid,
        ...req.body
    });
    try{
        const hospitalDB=await Hospital.findById(hospital);
        if(!hospitalDB){
            return res.status(500).json({
                ok:false,
                msg:`No existe un hospital registrado con id ${hospital}`
            });
        }
        const medicoDB=await medico.save();
        res.json({
            ok:true,
            msg:'Crear Medico',
            medico:medicoDB
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const actualizarMedico=async(req=request, res=response)=>{
    const uuidMedico=req.params.id;
    const uuidUsuario=req.uuid;
    const uuidHospital=req.body.hospital;
    try{
        const existeMedico=await Medico.findById(uuidMedico);
        if(!existeMedico){
            return res.status(400).json({
                ok:false,
                msg:`No existe un médico con id ${uuidMedico}`
            });
        }
        const existeHospital=await Hospital.findById(uuidHospital);
        if(!existeHospital){
            return res.status(400).json({
                ok:false,
                msg:`No existe un hospital con id ${uuidHospital}`
            });
        }
        const data={
            usuario:uuidUsuario,
            ...req.body
        }
        const medico=await Medico.findByIdAndUpdate(uuidMedico, data, {new:true});
        res.json({
            ok:true,
            msg:'Médico Actualizado',
            medico
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error interno, revisar logs'
        });
    }
};

const borrarMedico=async(req=request, res=response)=>{
    const uuidMedico=req.params.id;
    try{
        const existeMedico=await Medico.findById(uuidMedico);
        if(!existeMedico){
            return res.status(400).json({
                ok:false,
                msg:`No existe un médico con id ${uuidMedico}`
            });
        }
        await Medico.findByIdAndDelete(uuidMedico);
        res.json({
            ok:true,
            msg:'Médico eliminado exitosamente'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}