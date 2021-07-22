# Delilah Restó API
API para pedidos de productos del restaurante Delilah Restó. 
API hecha como primer sprint project para el curso de Desarrollo Web Back End de Acámica.

## Recursos y tecnologías utilizadas

- Node.js
- Nodemon
- Express
- Postman para manejo de endpoints y testing
- Swagger para documentación de API

## Instalación e inicializacion del proyecto

### 1 - Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/riccaicedo/Delilah-Rest-API).

Desde la consola con el siguiente link:

`git clone https://github.com/riccaicedo/Delilah-Rest-API .`

### 2 - Instalación de dependencias

```
npm install
```

### 3 - Iniciando el servidor

Abrir el archivo con nodemon

`nodemon src/index.js`

El servidor correrá en http://localhost:3000/

### 4 - Listo para usar!

Testear los endpoints provistos desde postman o desde la documentación con Swagger (http://localhost:3000/api-docs/) dónde se listarán los endpoints y métodos disponibles y la información necesaria para hacer uso de los mismos.

Cómo ejemplo al momento de probar el endpoint para realizar nuevos pedidos (http://localhost:3000/api-docs/#/Pedidos/post_pedidos) se puede usar:

```
{
 "carrito":[
  {
   "producto":{
   "id": 0,
   "nombre": "Hamburguesa clasica",
   "precio": 15000
   },
   "cantidad": 1
  },
  {
   "producto":{
   "id": 6,
   "nombre": “Papas”,
   "precio": 3000
   },
   "cantidad": 1
  },
  {
   "producto":{
   "id": 7,
   "nombre": “Gaseosa”,
   "precio": 2000
   },
   "cantidad": 1
  }
 ],
 "medio": "efectivo"
}
```
