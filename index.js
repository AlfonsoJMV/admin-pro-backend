const express=require('express');
// CORS
const cors = require('cors')
require('dotenv').config();

const { dbConnection }=require('./db/config');

// CREAR SERVIDOR DE EXPRESS
const app=express();

// CONFIGURAR CORS
app.use(cors());

// LECTURA Y PARSEO DE BODY
app.use(express.json());

// CONEXION A BD
dbConnection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// console.log(process.env);


// RUTAS
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto', process.env.PORT);
});