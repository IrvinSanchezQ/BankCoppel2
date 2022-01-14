const mongoose = require('mongoose');

const  ClientePruebaSchema = new mongoose.Schema ({
    Nombre: String,
    APaterno:String,
    AMaterno:String,
    Email: String,
    password: String,
    IdCliente: String,
    Direccion: String,
    Telefono: String,
    ciudad: String,
    Estado: String,
    CodigoPostal: String,
    FechaNacimiento: String,
    Nip: String,
    Cuenta:{_idC:String,
		Saldo:String,
		Tarjetas:[{_idC:String,
			CardNumber:String,
			Nombre:String,
			Apaterno:String,
			Amaterno:String,
			Ccv:String}]}
});
module.exports = mongoose.model('ClientePruebaDB', ClientePruebaSchema);
