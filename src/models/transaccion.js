// const mongoose = require('mongoose');
// //const Schema = mongoose.Schema;

// const  transaccionSchema = new mongoose.Schema ({
//     IdTarjetaOrigen: String,
//     IdTarjetaDestino: String,
//     Cvv: String,
//     TipoTransaccion: String, 
//     Motivo: String,
//     Monto: String,
//     Fecha: String
// });


// const  tarjeta_DebitoSchema = new mongoose.Schema ({
//     IdTarjetaOrigen: String,
//     IdCuenta: String,
//     Cvv: String,
//     NPropietario: String,
//     caducidad: String
// });

// const  cuentaSchema = new mongoose.Schema ({
//     IdCliente: String,
//     IdCuenta: String,
//     Saldo: String,
// });

// // module.exports = mongoose.model('transaccion', transaccionSchema);
// // module.exports = mongoose.model('cliente', clienteSchema);
// // module.exports = mongoose.model('tarjeta_Debito', tarjeta_DebitoSchema);
// // module.exports = mongoose.model('cuenta', cuentaSchema);

// const Transdb = mongoose.model('Transdb',transaccionSchema);
// const CliSchema = mongoose.model('cliente', clienteSchema);
// const TarSchema = mongoose.model('tarjeta_Debito', tarjeta_DebitoSchema);
// const CuentaSchema = mongoose.model('cuenta', cuentaSchema);
// module.exports = {Transdb, CliSchema,TarSchema,CuentaSchema }

const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const  transaccionSchema = new mongoose.Schema ({
    IdTarjetaOrigen: String,
    IdTarjetaDestino: String,
    Cvv: String,
    TipoTransaccion: String, 
    Motivo: String,
    Monto: String,
    Fecha: String,
    EstadoTrans: String
});
module.exports = mongoose.model('transaccion', transaccionSchema);
