require('dotenv').config();
const express = require ('express');
const basicAuth = require('express-basic-auth');
const PORT = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const autenticacion= require("./middlewares/autenticacion.middleware");
const swaggerOptions = require("./utils/swaggerOptions");

const app = express();

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/cuenta', require("./routes/cuenta.route"));
app.use(basicAuth({authorizer:autenticacion}));
app.use('/clientes',require("./routes/cliente.route"));
app.use('/productos', require("./routes/producto.route"));
app.use('/pedidos', require('./routes/pedido.route.js'));
app.use('/medios', require("./routes/medio.route"));

app.listen(PORT, () => {console.log("Escuchando desde el puerto: " + PORT)})
