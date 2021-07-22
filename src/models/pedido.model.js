const { verClientes } = require('./cliente.model');
const { verProductos} = require('./producto.model');
const { verMedios} = require('./medio.model');

//Estados de pedidos:
const estado = ["nuevo","confirmado","preparando","enviando","entregado"]

//es: id, [{producto, cantidad}], dirección, correo, medio, estado
const pedidos = [
    {
        id:0,
        carrito:[
            {
                producto:{
                    id: 0,
                    nombre: "Bagel de salmón",
                    precio: 20000
                },
                cantidad: 1
            },
            {
                producto:{
                    id: 6,
                    nombre: "Papas",
                    precio: 3000
                },
                cantidad: 1
            },
            {
                producto:{
                    id: 7,
                    nombre: "Cocacola",
                    precio: 2000
                },
                cantidad: 1
            }
        ],
        direccion: "Carrera 83a # 42 - 35",
        correo: "riccaicedo73@gmail.com",
        medio: "efectivo",
        estado: "entregado"
    },
    {
        id:1,
        carrito:[
            {
                producto:{
                    id: 0,
                    nombre: "Hamburguesa clasica",
                    precio: 15000
                },
                cantidad: 1
            },
            {
                producto:{
                    id: 6,
                    nombre: "Papas",
                    precio: 3000
                },
                cantidad: 1
            },
            {
                producto:{
                    id: 7,
                    nombre: "Cocacola",
                    precio: 2000
                },
                cantidad: 1
            }
        ],
        direccion: "Calle 13 # 45 - 68",
        correo: "elpepe@gmail.com",
        medio: "efectivo",
        estado: "entregado"
    }
];

//Crear pedido
const nuevoPedido =(pedidonuevo)=>{
    pedidos.push(pedidonuevo)
}

//Ver pedidos
const verPedidos=()=>{
    return pedidos;
}

//Ordenar los id de pedidos
const ordenarIdPedidos = ()=>{
    for (let index = 0; index < pedidos.length; index++) {
        const pedido = pedidos[index];
        pedido.id=index
    }
    return "Ordenado."
}

//Modificar estado
const modificarEstado = (id,estado) => {
    index = pedidos.findIndex(u=>u.id === id)
    pedidos[index].estado = estado
    return "El pedido con id #"+id+" se modificó como: "+estado
}

//Modificar direccion
const modificarDireccion = (id,direccion) => {
    index = pedidos.findIndex(u=>u.id === id)
    pedidos[index].direccion = direccion
    return "El pedido con id #"+id+" ahora tiene la dirección: "+direccion
}

//Borrar pedido
const borrarPedido = (index) => {
    pedidos.splice(index, 1)
}

//Calcular precio
const precio = (id)=>{
    const suma = 0
    for (let index = 0; index < pedidos[id].carrito.length; index++) {
        const pedido = (pedidos[index].producto.precio)*(pedidos[index].cantidad);
        suma += pedido;
    }
    return console.log(suma);
};

module.exports={verPedidos,precio,ordenarIdPedidos,nuevoPedido,modificarEstado,modificarDireccion,borrarPedido};