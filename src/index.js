const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const transaccionesRouters = require("./routes/transacciones");
const connectDB = require("./database/connection");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Resgistro = require("./models/ClientModel");
const consultadb = require("./models/CuentaModel");
const transaccdb = require("./models/transaccion");
const Clientdb = require("./models/ClientModel");
const ClientePruebaDB = require("./models/ClientePrueba");
const { body, validationResult } = require("express-validator");
const { functions, object } = require("underscore");
const res = require("express/lib/response");
//conexion directa
// const MongoClient = require("mongodb").MongoClient;
// var ObjectId = require("mongodb").ObjectId;
// const BanCoppelDB = "coppeldb";

// async function main() {
//     const url2 = "mongodb+srv://ADMIN:ADMIN123EIF@cluster0.8iasn.mongodb.net/BanCoppelDB?retryWrites=true&w=majority";
//     const client = new MongoClient(url2, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//       });
// 	try {
//         await client.connect();
//         await listDatabases(client);
//         async function listDatabases(client){
//             databasesList = await client.db().admin().listDatabases();        
//             console.log("Databases:");
//             databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//             g
//         };


//     } catch (e) {
//         console.error(e);
   
//     }finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

//ejemple de conexion directa
 const mongodb = require('mongodb').MongoClient;
 const uri = 'mongodb+srv://ADMIN:ADMIN123EIF@cluster0.8iasn.mongodb.net/BanCoppelDB?retryWrites=true&w=majority';

// const Nombre = process.argv[2] || '';
// mongodb.connect(uri, (err, con) => {
//     // si hay error finalizar
//     if(err){
//         console.log(`No se puede conectar al servidor de mongo ${uri}`);
//         process.exit(1);
//     }
//     // si no hay error consultar los estudiantes con el id prorpocionado
//     con.db('BanCoppelDB').collection('transaccions')
//         .find({IdTarjetaOrigen:"5579100251520005"}).toArray((err, docs) => {
//             // si hay error entonces finalizar
//             if(err){
//                 console.log(`Error al momento de realizar la consulta`);
//                 process.exit(1);
//             }
//             // mostrar los registros
//             console.log(docs);
// //            process.exit(0);
//         })
// });


dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//mongodb connection
connectDB();
//Settings

//render de arch staticos
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//render de ejs
app.get("/", (req, res) => {
  res.render("inicioSesion");
});

app.get("/cuentas",async (req, res) => {
  try{
    const arrayCuentas = await Clientdb.find()
    console.log(arrayCuentas)
    res.render("index",{
      arrayCuenta: arrayCuentas
   });
   }catch{
     console.log(error)
   }
});

app.get("/registro", (req, res) => {

  res.render("registroUsuario");
});
app.get("/EstadosDeCuenta", async(req, res) => {
 try{
   const arrayTransacciones = await transaccdb.find()
   console.log(arrayTransacciones)
   res.render("estadoDeCuenta",{
    arrayTransaccion: arrayTransacciones
  });
  }catch{
    console.log(error)
  }

});
app.get('/transaccion',async (req, res) => {

  res.render("ejemplo");
});
app.get("/Clientes", async(req, res) => {
  try{
    const arrayClientes = await ClientePruebaDB.find()
    console.log(arrayClientes)
    res.render("ClienteP",{
      arrayCliente: arrayClientes
   });
   }catch{
     console.log(error)
   }
  });
app.get("/inicio", (req, res) => {
// res.render("estadoDeCuenta");
});
  //app.get("/inicio", (req, res) => {
    //mongodb.connect(uri, (err, con) => {
  //   // si hay error finalizar
  //   if(err){
  //       console.log(`No se puede conectar al servidor de mongo ${uri}`);
  //       process.exit(1);
  //   }
  //   // si no hay error consultar los estudiantes con el id prorpocionado
  //   con.db('BanCoppelDB').collection('transaccions')
  //       .find({IdTarjetaOrigen:"5579100251520005"}).toArray((err, docs) => {
  //           // si hay error entonces finalizar
  //           if(err){
  //               console.log(`Error al momento de realizar la consulta`);
  //               process.exit(1);
  //           }
  //           // mostrar los registros
  //           console.log(docs);
  //           const ejemplo = con;

//  var str = docs;
//  typeof str;
//  console.log(typeof str);
          //  res.render("index",{Monto:ejemplo.Monto, Ccv:ejemplo.Cvv,IdTarjetaOrigen:con.IdTarjetaOrigen})

//            process.exit(0);
//        })
// });
//   //res.render("index",{cuenta}); {Monto:"300", Ccv:"123",IdTarjetaOrigen:"1222222" }
// // const ejemplo =   {Monto:"300", Ccv:"123",IdTarjetaOrigen:"1222222" };
// // res.render("index",{Monto:ejemplo.Monto, Ccv:ejemplo.Ccv,IdTarjetaOrigen:ejemplo.IdTarjetaOrigen})
// });

// app.get("/transaccion2", (req, res) => {
//     // const id = req.params.id
//   // try{
//   //   const consulta = await consultadb.findOne({_id: id})   
//   // } catch (error) {
//   //   console.log(error)
//   // }
//   res.render("transaccion");
// });
// app.use((req, res, next) => {
//     res.status(404).send('Error 404 Pagina no encontrada :(')
// })
//});

//middlewares
app.use(bodyParser.json()); 
app.use(express.json());
app.use(morgan("dev"));
//app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));

//contenido estatico mostrado y solicitado por node
app.use(express.static(__dirname + '/public'));

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

app.post('/TransaccionNueva', async(req,res) => {
  const body = req.body
  try{
    const transacccionincoming= new transaccdb(body)
    await transacccionincoming.save()
    console.log(transacccionincoming)
    // res.render("estadoDeCuenta");
    res.render("ejemplo");


  }catch(error){
    console.log(error);
  }
})

app.post("/iniciosesion", (req, res) => {
  const { IdCuenta, password } = req.body;

  Resgistro.findOne({ IdCuenta }, (err, registro) => {
    if (err) {
      res.status(500).send("erro al validar la cuenta");
    } else if (!registro) {
      res.status(500).send("el usuario no existe");
    } else {
      registro.isCorrectPassword(password, (err, result) => {
        if (err) {
          res.status(500).send("Error al autenticar");
        } else if (result) {
          res.status(200).send("usuario autenticado correctamente");
        } else {
          res.status(500).send("usuario y/o contraseña incorrectos");
        }
      });
    }
  });
});

app.post(
  "/registroUsuario",
  [
    body("Nombre", "ingresa un nombre valido").exists().isLength({ min: 3 }),
    body("APaterno", "ingresa un apellido valido 1")
      .exists()
      .isLength({ min: 3 }),
    body("AMaterno", "ingresa un apellido valido 2")
      .exists()
      .isLength({ min: 3 }),
    body("Email", "ingresa un email valido").exists().isEmail(),
    body(
      "password",
      "ingesa una contraseña con al menos una letra mayuscula, un numero y un caracter especial"
    )
      .exists()
      .isStrongPassword(),
    body("Direccion", "ingresa una direccion valida")
      .exists()
      .isLength({ min: 3 })
      .isString(),
    body("Telefono", "ingresa un telefono valido").exists().isMobilePhone(),
    body("ciudad", "ingrese el nombre de la ciudad donde habita")
      .exists()
      .isString()
      .isLength({ min: 3 }),
    body("Estado", "seleccione un estado")
      .equals(
        "Sonora",
        "Sinaloa",
        "Jalisco",
        "Quintana roo",
        "Chihuahua",
        "Monterrey"
      )
      .exists()
      .isString(),
    body("CodigoPostal", "seleccione un numero postal valido")
      .exists()
      .isLength({ max: 5 })
      .isLength({ min: 5 }),
  ],
  (req, res) => {
    const {Nombre,APaterno,AMaterno,Email,password,IdCliente,Direccion,Telefono,ciudad,Estado,CodigoPostal,  } = req.body;
    const registro = new Resgistro({
      Nombre,
      APaterno,
      AMaterno,
      Email,
      password,
      IdCliente,
      Direccion,
      Telefono,
      ciudad,
      Estado,
      CodigoPostal,
    });
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(req.body);
      const valores = req.body;
      const validaciones = errores.array();
      //aqui se añade la renderizacion de la paguina con errores
      res.render("registroUsuario", {
        validaciones: validaciones,
        valores: valores,
      });
    } else {
      registro.save((err) => {
        if (err) {
          res.status(500).send("error en el save");
        } else {
          res.render("registroUsuario");
          //  res.status(200).send('usuario registrado');
        }
      });
      //res.send('¡¡Registro exitoso exitosa!!')
    }
  }
);


//ROUTES
//app.use('registroUsuario.html',require('src/public/registroUsuario.html'));
app.use(require("./routes/index"));
//app.use('/api/movies',require('./routes/movies'));
app.use("/transacciones", transaccionesRouters);

//starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
