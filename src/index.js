const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const transaccionesRouters = require('./routes/transacciones');
const connectDB = require('./database/connection');
const app = express();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Resgistro = require ('./models/ClientModel');
const { body, validationResult } = require('express-validator');
const { functions } = require('underscore');
const res = require('express/lib/response');


dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/3000', {
//     useMongoClient: true
// })  .then(db => console.log('db is connected'))
//     .catch(err => console.log(err));

//mongodb connection
connectDB();
//Settings


//render de ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render("inicio")
})

app.get('/registro', (req, res) => {
    res.render("registroUsuario")
})
app.get('/EstadosDeCuenta', (req, res) => {
    res.render("estadodecuenta")
})
app.get('/inicio', (req, res) => {
    res.render("index")
})
app.get('/InicioDeSesion', (req, res) => {
    res.render("iniciosesion")
})
app.get('/transaccion2', (req, res) => {
    res.render("transaccion")
})
// app.use((req, res, next) => {
//     res.status(404).send('Error 404 Pagina no encontrada :(')
// })


//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

//contenido estatico mostrado y solicitado por node
//app.use(express.static(path.join(__dirname + 'public')));

// $("#AddUser").submit(function (event) {
//     alert("los datos fueron registrados con exito")
    
// });
// app.send.submit(function (evente) {
//     alert("los datos fueron registrados con exito")    
//});
//aqui creamos la conexion con el frond end o formularios
//min 17 https://www.youtube.com/watch?v=GlvpYCEEcVQ
// app.post('/registroUsuario', (req, res) => {
//     const {Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal} = req.body;
//     const registro = new Resgistro({Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal});
//     registro.save(err =>{
//         if(err){
//             res.status(500).send('error al resgistrar al usuario');
//         }else{
//             res.status(200).send('usuario registrado');
//         }
//     });
// });

app.post('/iniciosesion', (req, res) => {
    const {IdCuenta,password} = req.body;
    
    Resgistro.findOne({IdCuenta}, (err, registro) =>{
        if(err){
            res.status(500).send('erro al validar la cuenta');
        }else if(!registro){
            res.status(500).send('el usuario no existe');
        }else{
            registro.isCorrectPassword(password,(err, result) =>{
                if(err){
                    res.status(500).send('Error al autenticar');
                }else if(result){
                    res.status(200).send('usuario autenticado correctamente');
                }else{
                    res.status(500).send('usuario y/o contraseña incorrectos')
                }
            });
        }
    });
});



 app.post('/registroUsuario',[
     body('Nombre', 'ingresa un nombre valido')
        .exists()
        .isLength({min:3}),
     body('APaterno','ingresa un apellido valido 1')
        .exists()
        .isLength({min:3}),
     body('AMaterno','ingresa un apellido valido 2')
        .exists()
        .isLength({min:3}),
     body('Email', 'ingresa un email valido')
         .exists()
         .isEmail(),
     body('password', 'ingesa una contraseña con al menos una letra mayuscula, un numero y un caracter especial')
         .exists()
         .isStrongPassword(),
     body('Direccion', 'ingresa una direccion valida')
         .exists()
         .isLength({min:3})
         .isString(),
     body('Telefono', 'ingresa un telefono valido')
        .exists()
        .isMobilePhone(),
     body('ciudad', 'ingrese el nombre de la ciudad donde habita')
        .exists()
        .isString()
        .isLength({min:3})
        ,
     body('Estado', 'seleccione un estado')
        .equals("Sonora","Sinaloa", "Jalisco", "Quintana roo", "Chihuhua","Monterrey")
         .exists()
         .isString(),
     body('CodigoPostal', 'seleccione un numero postal valido')
        .exists()
        .isLength({max:5})
        .isLength({min:5})
 ],(req,res)=>{
    const {Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal} = req.body;
    const registro = new Resgistro({Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal});
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        console.log(req.body)
        const valores = req.body
        const validaciones = errores.array()
        //aqui se añade la renderizacion de la paguina con errores
        res.render('registroUsuario', {validaciones:validaciones, valores:valores})
    }else{
        registro.save(err =>{
            if(err){
                res.status(500).send('error en el save');
            }else{
                res.render('registroUsuario');
              //  res.status(200).send('usuario registrado');
            }
        });
        //res.send('¡¡Registro exitoso exitosa!!')
    }
 });

/*aqui estaba bien broder
app.get('/', (req, res) => {
});*/

//ROUTES
//app.use('registroUsuario.html',require('src/public/registroUsuario.html'));
app.use(require('./routes/index'));
//app.use('/api/movies',require('./routes/movies'));
app.use('/transacciones', transaccionesRouters);


//starting the server
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
module.exports = app;
