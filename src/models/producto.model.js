//Lista:
const productos = [
    {
        id: 0,
        nombre: "Bagel de salmón",
        precio: 20000
    },
    {
        id: 1,
        nombre: "Hamburguesa clasica",
        precio: 15000
    },
    {
        id: 2,
        nombre: "Sandwich veggie",
        precio: 13500
    },
    {
        id: 3,
        nombre: "Ensalada veggie",
        precio: 14500
    },
    {
        id: 4,
        nombre: "Focaccia",
        precio: 13000
    },
    {
        id: 5,
        nombre: "Sandwich Focaccia",
        precio: 20000
    },
    {
        id: 6,
        nombre: "Papas",
        precio: 3000
    },
    {
        id: 7,
        nombre: "Gaseosa",
        precio: 2000
    },
    {
        id: 8,
        nombre: "Té",
        precio: 2000
    }
];

//Crear producto
const crearProducto = (productoNuevo) => {
    productos.push(productoNuevo);
}

//Ver productos
const verProductos = () => {
    return productos;
}

//Ordenar los id para cuando se modifique o se elimine productos
const ordenarIdProductos = ()=>{
    for (let index = 0; index < productos.length; index++) {
        const producto = productos[index];
        producto.id=index
    }
    return "Ordenado."
}

//Modificar producto
const modificarProducto = (id,nombre,precio) => {
    index = productos.findIndex(u=>u.id === id)
    productos[index].nombre = nombre
    productos[index].precio = precio
    return "Producto con id #"+id+" modificado."
}

//Borrar producto
const borrarProducto = (index) => {
    productos.splice(index, 1)
}

module.exports = { verProductos,ordenarIdProductos, crearProducto,borrarProducto,modificarProducto}
