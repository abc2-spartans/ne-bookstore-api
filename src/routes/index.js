// Health check endpoints
import express from 'express';
import dotenv from 'dotenv';
import booksRouter from './books.js';
import { getConfig } from '../config/index.js';

dotenv.config();

const router = express.Router();
const config = getConfig();
const { hostname, port } = config.app;
const baseURL = `http://${hostname}:${port}/api/v1`;

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: API Health Check
 *     description: Check if the API is running and get basic information
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Bookstore API',
        version: '1.0.0',
        documentation: `${baseURL}/docs`,
        endpoints: {
            books: `${baseURL}/books`
        }
    });
});

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health Check
 *     description: Simple health check endpoint
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API v1 routes
router.use('/books', booksRouter);

export default router;