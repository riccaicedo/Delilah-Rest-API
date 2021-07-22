const { verClientes } = require('../models/cliente.model');

const autenticacion = (user, password) => {
    const usuarioEncontrado = verClientes().find(u => u.correo === user && u.contrasena === password);
    if(usuarioEncontrado) return true;
    else return false;
}

module.exports = autenticacion;