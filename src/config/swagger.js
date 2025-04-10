const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Social Media API",
      version: "1.0.0",
      description: "A simple social media API built with Node.js, Express, and MongoDB. It allows users to create, read, update, and delete posts.",
    },
    contact: {
      name: "Emmanuel Sakyi",
      title: "Junior Software Backend Engineer",
      url: "www.github.com/sakyi-ken",
      email: "sakyiken7@gmail.com",
    },
    license: {
      name: "MIT License",
      url: "https://github.com/Sakyi-Ken/mini-social-media-api",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
        {
        url: "https://mini-social-media-api.onrender.com",
        description: "Live server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            text: {
              type: "string",
            },
            user: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
                email: { type: "string" },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    
  },
  apis: [path.join(__dirname,"../routes/*.js")],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
