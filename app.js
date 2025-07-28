
import express from 'express';
import dotenv from 'dotenv';
import { initDatabase } from './src/db/init.js';
import apiRoutes from './src/routes/index.js';
import { getConfig } from './src/config/index.js';
import { serverError, notFound } from './src/utils/apiResponse.js';

// Initialize environment variables
dotenv.config();
const config = getConfig();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/v1', apiRoutes);


// 404 Handler
app.use((req, res) => {
    notFound(res, 'The requested resource was not found');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    serverError(res, err);
});

// Initialize database and start server
const startServer = async () => {
    try {
        // Initialize database
        await initDatabase();
        console.log('Database initialized successfully');

        // Start the server
        const server = app.listen(config.app.port, () => {
            console.log(`Server is running on http://${config.app.hostname}:${config.app.port}`);
            console.log(`API Documentation: http://${config.app.hostname}:${config.app.port}/api/v1`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('UNHANDLED REJECTION! 💥 Shutting down...');
            console.error(err);
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
};

// Start the application
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err);
    process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    process.exit(0);
});

export default app;
