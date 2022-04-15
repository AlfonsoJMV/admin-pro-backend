const express=require('express');
// CORS
const cors = require('cors')
require('dotenv').config();

const { dbConnection }=require('./db/config');

// CREAR SERVIDOR DE EXPRESS
const app=express();

// CONFIGURAR CORS
app.use(cors());

// CONEXION A BD
dbConnection();

// console.log(process.env);


// RUTAS
app.get('/', (req,res)=>{
    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
});

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto', process.env.PORT);
});