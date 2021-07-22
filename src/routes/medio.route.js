const express = require('express');
const router = express.Router();

const { verClientes } = require('../models/cliente.model');
const { verMedios,ordenarIdMedios, nuevoMedio, modificarMedio,borrarMedio } = require('../models/medio.model');

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
 * /medios:
 *  get:
 *      summary: Obtener todos los medios del sistema
 *      tags: [Medios]
 *      responses:
 *          200:
 *              description: Lista de medios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Medios'
 */
//Ver medios de pago como administrador
router.get("/",(req,res)=>{
    ordenarIdMedios();
    res.status(200).json(verMedios())
})

/**
 * @swagger
 * /medios:
 *  post:
 *      summary: Crear nuevo medio de pago en el sistema
 *      tags: [Medios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Nuevo medio'
 *      responses:
 *          201:
 *              description: Registro exitoso
 *          400:
 *              description: Error en registro
 */
//Crear nuevo medio de pago como administrador
router.post("/",(req,res)=>{
    const num = verMedios().length+1
    const {nombre} = req.body;
        if (nombre) {
            nuevoMedio({
                id: num,
                nombre: nombre,
            });
            res.status(201).json("Registro exitoso.");
        }
        else{
            res.status(400).json("Error en registro.");
        };
    ordenarIdMedios();
})

/**
 * @swagger
 * /medios:
 *  put:
 *      summary: Modificar medio de pago en el sistema
 *      tags: [Medios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Modificar medio'
 *      responses:
 *          201:
 *              description: Modificación exitosa
 *          400:
 *              description: Error en la modificación
 */
//Modificar medios como administrador
router.put("/",(req,res)=>{
    const {id,nombre} = req.body;
        if (id&&nombre) {
            modificarMedio(id,nombre)
            res.status(201).json("Modificación exitosa.");
        }
        else{
            res.status(400).json("Error en la modificación.");
        };
    ordenarIdMedios();
});

/**
 * @swagger
 * /medios:
 *  delete:
 *      summary: Borrar medio de pago en el sistema
 *      tags: [Medios]
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea eliminar
 *        required: true
 *        type: integer
 *      responses:
 *          201: Medio borrado con exito
 *          400: Id no encontrado
 */
//Borrar medios como administrador
router.delete("/:id",(req,res)=>{
    const elemento = verMedios().some(u => u.id === parseInt(req.params.id));
    if(real){
        borrarMedio(id)
        res.status(201).json(verMedios(),"Medio borrado con exito");
    } else {
        res.status(400).json('Id no encontrado');
    }
    ordenarIdMedios();
});

/**
 * @swagger
 * tags:
 *  name: Medios
 *  description: Seccion de los medios de pago
 * 
 * components: 
 *  schemas:
 *      Nuevo medio:
 *          type: object
 *          required:
 *              -nombre
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del nuevo medio de pago
 *          example:
 *              nombre: Bitcoin
 *      Modificar medio:
 *          type: object
 *          required:
 *              -id
 *              -nombre
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del medio a modificar
 *              nombre:
 *                  type: string
 *                  description: Nuevo nombre del medio a modificar
 *          example:
 *              id: 
 *              nombre: Bitcoin
 *      Medios:
 *          type: object
 *          required:
 *              -id
 *              -nombre
 *          properties:
 *              id:
 *                  type: number
 *                  description: Id del medio de pago
 *              nombre:
 *                  type: string
 *                  description: Nombre del medio de pago
 *          example:
 *              id: 0
 *              nombre: Efectivo
 */

module.exports = router;