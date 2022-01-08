const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const { app } = require('express');
//const { app } = require('express/lib/response');
const { model } = require('mongoose');
//const router = express.Router();
const router = require('express-promise-router')();

const {
    index, newTransaccion
} =  require('../controllers/transaccion');
router.get('/',index);
router.post('/', newTransaccion);

// app.get('http://localhost:3000/aqui-se-reciben-los-datos', (req,res)  =>{
//     res.send('transaccion exitosa... creo')
// });
module.exports = router;