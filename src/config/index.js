/**
 * Get application configuration
 * @returns {Object} Application configuration
 */
export const getConfig = () => {
    // Default configuration
    const config = {
        // Application settings
        app: {
            hostname: process.env.APP_HOST || 'localhost',
            port: parseInt(process.env.APP_PORT || '3000', 10),
            env: process.env.NODE_ENV || 'development',
            apiPrefix: '/api/v1',
        },
        
        // Database configuration
        database: {
            // Active database type (sqlite, mongodb, etc.)
            type: process.env.DB_TYPE || 'sqlite',
            
            // Common database options
            options: {
                logging: process.env.DB_LOGGING === 'true',
                pool: {
                    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
                    min: parseInt(process.env.DB_POOL_MIN || '0', 10),
                    acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
                    idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10)
                }
            },
            
            // SQLite specific configuration
            sqlite: {
                database: process.env.SQLITE_DB_PATH || 'bookstore.db',
                storage: process.env.SQLITE_STORAGE || ':memory:',
                dialect: 'sqlite',
            },
            
            // MongoDB specific configuration
            mongodb: {
                uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
                dbName: process.env.MONGODB_DB_NAME || 'bookstore',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 45000,
                }
            },
            
            // Add other database configurations as needed
            // mysql: { ... },
            // postgres: { ... },
        },
        
        // JWT configuration
        jwt: {
            secret: process.env.JWT_SECRET || 'your-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        },
        
        // Rate limiting
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
            max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // limit each IP to 100 requests per windowMs
        },
    };
    
    // Override with environment specific config if NODE_ENV is set
    const env = process.env.NODE_ENV || 'development';
    if (env === 'production') {
        // Production specific overrides
        config.app.hostname = process.env.APP_HOST || '0.0.0.0';
        // Add production specific config overrides here
    } else if (env === 'test') {
        // Test specific overrides
        config.database.sqlite.storage = ':memory:';
        // Add test specific config overrides here
    }
    
    return config;
};

/**
 * Get database configuration for the active database type
 * @returns {Object} Database configuration
 */
export const getDatabaseConfig = () => {
    const config = getConfig();
    const dbType = config.database.type;
    
    if (!config.database[dbType]) {
        throw new Error(`No configuration found for database type: ${dbType}`);
    }
    
    return {
        type: dbType,
        ...config.database[dbType],
        options: {
            ...config.database.options,
            ...(config.database[dbType].options || {})
        }
    };
};

// Export the active database config as default
export default getConfig();