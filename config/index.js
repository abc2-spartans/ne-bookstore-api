export const getConfig = () => {
    return {
        app: { hostname: process.env.APP_HOST, port: process.env.APP_PORT, },
        sqlite: { database: process.env.SQLITE_DB_PATH || 'bookstore.db', },
    };
};