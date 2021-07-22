const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 1 - Delilah Restó",
            version: "1.0.0",
            description: "API para realizar pedidos al restaurante Delilah Restó",
            contact : {
                name : "Ricardo Andres Caicedo Erazo",
                email : "riccaicedo73@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            {
                basicAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};
module.exports = swaggerOptions;