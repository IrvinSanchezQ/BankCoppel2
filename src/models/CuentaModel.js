const mongoose = require('mongoose');

const  cuentaSchema = new mongoose.Schema ({
    IdCliente: String,
    IdCuenta: String,
    Saldo: String,
});

module.exports = mongoose.model('CuentaDB', cuentaSchema);
