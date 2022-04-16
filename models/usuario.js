const { Schema, model }=require('mongoose');

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
});

// SOLO PARA FINES VISUALES, NO AFECTA LA BD
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object}=this.toObject();
    object.uuid=_id;
    return object;
});

module.exports=model('Usuario', UsuarioSchema);