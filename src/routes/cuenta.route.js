const express = require('express');
const router = express.Router();

const { crearCliente, verClientes } = require('../models/cliente.model');

/**
 * @swagger
 * /cuenta/registro:
 *  post:
 *      summary: Registro de clientes en el sistema
 *      security: []
 *      tags: [Cuenta]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Registro'
 *      responses:
 *          409:
 *              description: Correo ya en uso
 *          201:
 *              description: Registro exitoso
 *          400:
 *              description: Error en registro
 */

//Registro para los cuenta
router.post("/registro", (req,res) => {
    const {usuario,correo,nombre,telefono,direccion,contrasena} = req.body;
    if (verClientes().find(u=>u.correo===correo)) {
        res.status(409).json("Correo ya en uso.");
    } else {
        if (usuario && correo && nombre && telefono && direccion && contrasena ) {
            crearCliente({
                usuario: usuario,
                correo: correo,
                nombre: nombre,
                telefono: telefono,
                direccion: direccion,
                contrasena: contrasena,
                admin: false
            });
            res.status(201).json("Registro exitoso.");
        }
        else{
            res.status(400).json("Error en registro");
        }
    }
});

/**
 * @swagger
 * /cuenta/login:
 *  post:
 *      summary: Login de clientes en el sistema
 *      security: []
 *      tags: [Cuenta]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Sesión iniciada
 *          404:
 *              description: Usuario no encontrado
 *          204:
 *              description: Faltan datos
 */

//Login para los clientes
router.post("/login", (req, res) => {
    const {correo, contrasena } = req.body;
    if (correo && contrasena) {
        const usuario = verClientes().find(u => u.correo === correo && u.contrasena === contrasena)
        if (usuario) 
        {
            res.status(200).json("Sesión iniciada");    
        }
        else res.status(404).json('Usuario no encontrado')
    }
    else res.status(204).json('Faltan datos');
});

/**
 * @swagger
 * tags:
 *  name: Cuenta
 *  description: Seccion de la cuenta de los clientes
 * 
 * components: 
 *  schemas:
 *      Registro:
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
 *          example:
 *              usuario: cliente12345
 *              correo: cliente@gmail.com
 *              nombre: Fulanito De Tal
 *              telefono: 3176542347
 *              direccion: Calle Falsa # 123
 *              contrasena: pase12345
 *      Login:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              correo:
 *                  type: string
 *                  description: Correo del cliente
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del cliente
 *          example:
 *              correo: ejemplo@gmail.com
 *              contrasena: contrasena
 */
module.exports = router;