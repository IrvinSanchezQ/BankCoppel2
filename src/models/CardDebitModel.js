const mongoose = require('mongoose');

const  tarjeta_DebitoSchema = new mongoose.Schema ({
    IdTarjetaOrigen: String,
    IdCuenta: String,
    Cvv: String,
    NPropietario: String,
    caducidad: String
});
module.exports = mongoose.model('DebitCardDB', tarjeta_DebitoSchema);
