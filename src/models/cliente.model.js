//Lista:
const clientes = [
    {
        usuario: "ricardocaicedo",
        nombre: "Ricardo Caicedo",
        correo: "riccaicedo73@gmail.com",
        telefono: 3178270778,
        direccion: "Carrera 83a # 42 - 35",
        contrasena: "contrasena",
        admin: true
    },
    {
        usuario: "elpepe",
        nombre: "Jose Fernandez",
        correo: "elpepe@gmail.com",
        telefono: 3204589685,
        direccion: "Calle 13 # 45 - 68",
        contrasena: "elpepecontrasena",
        admin: false
    },
    {
        usuario: "administrador",
        nombre: "Administrador",
        correo: "administrador@gmail.com",
        telefono: 3000000000,
        direccion: "Carrera 83a # 42 - 35",
        contrasena: "contrasena",
        admin: true
    },
    {
        usuario: "ejemplo",
        nombre: "Ejemplo de clinete",
        correo: "ejemplo@gmail.com",
        telefono: 3100000000,
        direccion: "Carrera 80a # 34 - 35",
        contrasena: "contrasena",
        admin: false
    }
];

//Crear cliente
const crearCliente = (clienteNuevo) => {
    clientes.push(clienteNuevo);
}

//Ver clientes
const verClientes = () => {
    return clientes;
}

//Borrar cliente
const borrarUltimoCliente = ()=>{
    clientes.splice(clientes.length,1);
};

const borrarPrimerCliente = ()=>{
    clientes.splice(0,1);
};

const borrarCliente =(index)=>{
    clientes.splice(index,1);
};

//Encontrar cliente por usuario o por correo
const clientePor_Usuario_Email = (usuarioOcorreo)=>{
    const cliente = clientes.find(u => ((u.usuario === usuarioOcorreo)|| (u.correo === usuarioOcorreo)));
    return cliente;
};

module.exports = { verClientes, crearCliente, clientePor_Usuario_Email, borrarUltimoCliente, borrarPrimerCliente,borrarCliente }