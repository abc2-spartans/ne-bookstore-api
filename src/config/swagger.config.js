import swaggerJsdoc from 'swagger-jsdoc';
import { getConfig } from './index.js';
import dotenv from 'dotenv';
dotenv.config();

const config = getConfig();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
      description: "A simple REST API for managing a bookstore",
      contact: {
        name: "Bookstore Support",
        email: "support@bookstore.com",
      },
    },
    servers: [
      {
        url: `http://${config.app.hostname}:${config.app.port}`,
        description: "Development server",
      },
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
        Book: {
          type: "object",
          required: ["title", "author"],
          properties: {
            id: {
              type: "string",
              format: "objectId",
              description: "MongoDB ObjectId (auto-generated)",
            },
            title: { type: "string", description: "Book title" },
            author: { type: "string", description: "Book author" },
            publishedYear: {
              type: "integer",
              description: "Year of publication",
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
          example: {
            id: "652f9c7d7c7e4f1b8c8e4d1a",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            publishedYear: 1925,
            created_at: "2023-01-01T00:00:00.000Z",
            updated_at: "2023-01-01T00:00:00.000Z",
          },
        },
        BookInput: {
          type: "object",
          required: ["title", "author"],
          properties: {
            title: { type: "string" },
            author: { type: "string" },
            publishedYear: { type: "integer" },
          },
          example: {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            publishedYear: 1925,
          },
        },
      },
      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
