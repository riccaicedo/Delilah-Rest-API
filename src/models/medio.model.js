//Lista de medios de pago
const medios = [
    {
        id: 0,
        medio:"efectivo"
    },
    {
        id:1,
        medio:"tarjeta credito"
    },
    {
        id:2,
        medio:"tarjeta debito"
    }
];

// Ver medios de pago
const verMedios = () => {
    return medios;
}

//Crear nuevo medio de pago
const nuevoMedio = (medionuevo) => {
    medios.push(medionuevo);
}

//Modificar medio
const modificarMedio = (id,nombre) => {
    index = medios.findIndex(u=>u.id === id)
    medios[index].nombre = nombre
    return "Medio con id #"+id+" modificado."
}

//Borrar medio
const borrarMedio = (index) => {
    medios.splice(index, 1)
}

//Ordenar los id para cuando se modifique o se elimine medios
const ordenarIdMedios = ()=>{
    for (let index = 0; index < medios.length; index++) {
        const medio = medios[index];
        medio.id=index
    }
    return "Ordenado."
}

module.exports = { verMedios,nuevoMedio,ordenarIdMedios,modificarMedio,borrarMedio};
