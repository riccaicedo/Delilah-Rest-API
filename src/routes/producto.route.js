const express = require('express');
const { verClientes } = require('../models/cliente.model');
const router = express.Router();

const {verProductos,crearProducto,borrarProducto,modificarProducto,ordenarIdProductos} = require("../models/producto.model");

/**
 * @swagger
 * /productos:
 *  get:
 *      summary: Obtener todos los productos en el sistema
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: Todos los productos en el sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Productos'
 */
//Ver todos los productos
router.get("/",(req,res)=>{
    ordenarIdProductos();
    res.status(200).json(verProductos());
});

//Autorización como administrador
router.use("/", (req, res, next) => {
    if(verClientes().find(u => u.correo === req.auth.user && u.admin == true)){
        return next();
    }else{
        return res.status(401).json("No estás autorizado, es necesario ser administrador");
    };
});

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Crear nuevo producto 
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Nuevo producto'
 *      responses:
 *          201:
 *              description: Producto creado
 *          400:
 *              description: Error en la creacion del producto
 */
//Crear nuevos productos como administrador
router.post("/",(req,res)=>{
    const num = verProductos().length+1
    const {nombre,precio} = req.body;
        if (nombre && precio) {
            crearProducto({
                id: num,
                nombre: nombre,
                precio: precio
            });
            res.status(201).json("Registro exitoso.");
        }
        else{
            res.status(400).json("Error en registro.");
        };
    ordenarIdProductos();
});

/**
 * @swagger
 * /productos:
 *  put:
 *      summary: Modificar producto 
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Modificar producto'
 *      responses:
 *          201:
 *              description: Modificación exitosa
 *          400:
 *              description: Error en la modificación
 */
//Modificar productos como administrador
router.put("/",(req,res)=>{
    const {id,nombre,precio} = req.body;
        if (id&&nombre && precio) {
            modificarProducto(id,nombre,precio)
            res.status(201).json("Modificación exitosa.");
        }
        else{
            res.status(400).json("Error en la modificación.");
        };
    ordenarIdProductos();
});

/**
 * @swagger
 * /productos:
 *  delete:
 *      summary: Borrar producto del sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Borrar producto'
 *      responses:
 *          201: Producto borrado con exito
 */
//Borrar productos como administrador
router.delete("/",(req,res)=>{
    const { id } = req.body;
    borrarProducto(id);
    res.status(201).json("Producto borrado con exito")
    ordenarIdProductos();
});

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: Seccion de los productos
 * 
 * components: 
 *  schemas:
 *      Productos:
 *          type: object
 *          required:
 *              -id
 *              -nombre
 *              -precio
 *          properties:
 *              id:
 *                  type: number
 *                  description: Numero de identificación del producto
 *              nombre:
 *                  type: string
 *                  description: Nombre del producto
 *              precio:
 *                  type: number
 *                  description: Precio del producto
 *          example:
 *              id: 1
 *              nombre: Hamburguesa clasica
 *              precio: 15000
 *      Nuevo producto:
 *          type: object
 *          required: nombre,precio
 *              -nombre
 *              -precio
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del producto
 *              precio:
 *                  type: number
 *                  description: Precio del producto
 *          example:
 *              nombre: Choripan
 *              precio: 10000
 *      Modificar producto:
 *          type: object
 *          required:
 *              -id
 *              -nombre
 *              -precio
 *          properties:
 *              id:
 *                  type: number
 *                  description: Numero de identificación del producto
 *              nombre:
 *                  type: string
 *                  description: Nombre del producto
 *              precio:
 *                  type: number
 *                  description: Precio del producto
 *          example:
 *              id: 1
 *              nombre: Hamburguesa doble
 *              precio: 20000
 *      Borrar producto:
 *          type: object
 *          required:
 *              -id
 *          properties:
 *              id:
 *                  type: number
 *                  description: Numero de identificacion del producto a borrar
 *          example:
 *              id: 1
 */

module.exports = router;