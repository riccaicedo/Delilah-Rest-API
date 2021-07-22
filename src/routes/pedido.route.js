const express = require('express');
const {verClientes} = require('../models/cliente.model');
const {verProductos}=require("../models/producto.model");
const {precio,nuevoPedido,ordenarIdPedidos,verPedidos,modificarEstado,modificarDireccion,borrarPedido}=require("../models/pedido.model")
const {verMedios}=require("../models/medio.model")
const router = express.Router();

/**
 * @swagger
 * /pedidos:
 *  post:
 *      summary: Hacer nuevo pedido 
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Nuevo pedido'
 *      responses:
 *          201:
 *              description: Pedido hecho
 *          400:
 *              description: Error en el pedido
 *          409:
 *              description: El medio elegido no está disponible
 */
//Hacer nuevo pedido
router.post("/",(req,res)=>{
    const num = verPedidos().length+1;
    const cliente = verClientes().find(u => u.correo === req.auth.user)
    const {carrito,medio} = req.body;
        if (verMedios().find(u=>u.medio===medio)) {
            if (carrito&&medio) {
                nuevoPedido({
                    id:num,
                    carrito:carrito,
                    direccion: cliente.direccion,
                    correo: cliente.correo,
                    medio: medio,
                    estado: "nuevo"
                });
                res.status(201).json("Pedido hecho.");
            }
            else{
                res.status(400).json("Error en el pedido.");
            };
        } else {
            res.status(409).json("El medio elegido no está disponible, los medios disponibles son:"+verMedios());
        };
    ordenarIdPedidos();
});

/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: Obtener todos los pedidos del cliente
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Historial de pedidos del cliente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Pedidos'
 */
//Ver historial de los pedidos de cliente
router.get("/",(req,res)=>{
    ordenarIdPedidos();
    res.status(200).json(verPedidos().filter(u => u.correo === req.auth.user));
});

/**
 * @swagger
 * /pedidos/direccion:
 *  put:
 *      summary: Modificar direccion del pedido 
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Modificar direccion'
 *      responses:
 *          201:
 *              description: Modificación exitosa
 *          400:
 *              description: Error en la modificación
 */
//Modificar la dirección del pedido
router.put("/direccion",(req,res)=>{
    const {id,direccion} = req.body;
        if (id&&direccion) {
            modificarDireccion(id,direccion)
            res.status(201).json("Modificación de dirección exitosa.")
        }
        else{
            res.status(400).json("Error en la modificación de dirección.");
        };
    ordenarIdPedidos();
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
 * /pedidos/ver:
 *  get:
 *      summary: Obtener todos los pedidos en el sistema
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Obtener todos los pedidos en el sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Pedidos'
 */
//Ver todos los pedidos como administrador
router.get("/ver",(req,res)=>{
    ordenarIdPedidos();
    res.status(200).json(verPedidos());
});

/**
 * @swagger
 * /pedidos/estado:
 *  put:
 *      summary: Modificar estado del pedido en el sistema
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Modificar estado'
 *      responses:
 *          201:
 *              description: Modificación exitosa
 *          400:
 *              description: Error en la modificación
 */
//Modificar estado de pedidos como administrador
router.put("/estado",(req,res)=>{
    const {id,estado} = req.body;
        if (id&&estado) {
            modificarEstado(id,estado)
            res.status(201).json("Modificación exitosa.")
        }
        else{
            res.status(400).json("Error en la modificación.");
        };
    ordenarIdPedidos();
});

/**
 * @swagger
 * /pedidos/borrar:
 *  delete:
 *      summary: Borrar pedido en el sistema
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Borrar pedido'
 *      responses:
 *          201: Pedido borrado con exito
 */
//Borrar pedidos como administrador
router.delete("/borrar",(req,res)=>{
    const { id } = req.body;
    borrarPedido(id);
    res.status(201).json("Pedido borrado con exito")
    ordenarIdPedidos();
});

/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de los pedidos
 * 
 * components: 
 *  schemas:
 *      Orden:
 *          type: object
 *          required:
 *              -producto
 *              -cantidad
 *          properties:
 *              producto:
 *                  $ref: "#/components/schemas/Productos"
 *              cantidad:
 *                  type: number
 *                  description: Numero de productos
 *          example:
 *                  cantidad: 2
 *      Carrito:
 *          type: object
 *          required:
 *              -orden
 *          properties:
 *              orden:
 *                  $ref: "#/components/schemas/Orden"
 *      Nuevo Pedido:
 *          type: object
 *          required:
 *              -carrito
 *              -medio
 *          properties:
 *              carrito:
 *                  $ref: "#/components/schemas/Carrito"
 *              medio:
 *                  type: string
 *                  description: Medio de pago
 *          example:
 *              medio: efectivo
 *      Pedidos:
 *          type: object
 *          required:
 *              -id
 *              -carrito
 *              -direccion
 *              -correo
 *              -medio
 *              -estado
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del pedido
 *              carrito:
 *                  $ref: "#/components/schemas/Carrito"
 *              direccion:
 *                  type: string
 *                  description: Dirección del cliente
 *              correo:
 *                  type: string
 *                  description: Correo electronico del cliente
 *              medio:
 *                  type: string
 *                  description: Medio de pago
 *              estado:
 *                  type: string
 *                  description: Estado actual del pedido
 *                  enum: 
 *                      -"nuevo"
 *                      -"confirmado"
 *                      -"preparando"
 *                      -"enviando"
 *                      -"entregado"
 *          example:
 *              id: 0
 *              direccion: Calle falsa 123
 *              correo: ejemplo@correo.com
 *              medio: efectivo
 *              estado: entregado
 *      Modificar direccion:
 *          type: object
 *          required:
 *              -id
 *              -direccion
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del medio de pago a borrar
 *              direccion:
 *                  type: string
 *                  description: Dirección del cliente
 *          example:
 *              id: 1
 *              direccion: Calle 60 # 13 - 20
 *      Modificar estado:
 *          type: object
 *          required:
 *              -id
 *              -estado
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del medio de pago
 *              estado:
 *                  type: string
 *                  description: Estado actual del pedido
 *                  enum: 
 *                      -"nuevo"
 *                      -"confirmado"
 *                      -"preparando"
 *                      -"enviando"
 *                      -"entregado"
 *          example:
 *              id: 1
 *              estado: "enviando"
 *      Borrar pedido:
 *          type: object
 *          required:
 *              -id
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del medio de pago
 *          example:
 *              id: 1
 */

module.exports = router;