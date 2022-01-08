const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saldRounds =10;
 //const Schema = mongoose.Schema;

const  clienteSchema = new mongoose.Schema ({
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
    IdCuenta: String 
});
clienteSchema.pre('save', function (next) {
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password,saldRounds,(err,hashedPassword) =>{
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
    
});
clienteSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password,this.password, function(err, same) {
        if(err){
            callback(err);
        }else{
            callback(err, same);
         }
    });
}

module.exports = mongoose.model('Clientdb', clienteSchema);
   
