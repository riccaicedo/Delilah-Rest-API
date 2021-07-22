const express = require('express');
const router = express.Router();

const { verClientes } = require('../models/cliente.model');

//Autorización como administrador
router.use("/", (req, res, next) => {
    if(verClientes().find(u => u.correo === req.auth.user && u.admin == true)){
        return next();
    }else{
        return res.status(401).json("No estás autorizado, es necesario ser administrador");
    };
});

//Ver todos los clientes
/**
 * @swagger
 * /clientes:
 *  get:
 *      summary: Obtener todos los clientes del sistema
 *      tags: [Clientes]
 *      responses:
 *          200:
 *              description: Lista de clientes del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cliente'
 */
router.get("/",(req,res)=>{
res.status(200).json(verClientes())
});

/**
 * @swagger
 * tags:
 *  name: Clientes
 *  description: Seccion para visualizar los clientes
 * 
 * components: 
 *  schemas:
 *      Cliente:
 *          type: object
 *          required:
 *              -usuario
 *              -correo
 *              -nombre
 *              -telefono
 *              -direccion
 *              -contrasena
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: Nombre del usuario que usa el cliente
 *              correo:
 *                  type: string
 *                  description: Correo del cliente
 *              nombre:
 *                  type: string
 *                  description: Nombre real del cliente
 *              telefono:
 *                  type: number
 *                  description: Numero telefonico del cliente
 *              direccion:
 *                  type: string
 *                  description: Direccion del cliente
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del cliente
 *              admin:
 *                  type: boolean
 *                  description: Permiso como administrador
 *          example:
 *              usuario: cliente12345
 *              correo: cliente@gmail.com
 *              nombre: Fulanito De Tal
 *              telefono: 3176542347
 *              direccion: Calle Falsa # 123
 *              contrasena: pase12345
 *              admin: false
 */

module.exports = router;