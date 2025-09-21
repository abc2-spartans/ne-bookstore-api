import { Sequelize } from "sequelize";
import { getConfig } from "../config/index.js";
import dotenv from "dotenv";
dotenv.config();

const config = getConfig();

// Create a new Sequelize instance for PostgreSQL
export const sequelize = new Sequelize(
  config.database.postgres.database,
  config.database.postgres.user,
  config.database.postgres.password,
  {
    host: config.database.postgres.host,
    port: config.database.postgres.port,
    dialect: "postgres",
    logging: false, // Set true to see SQL logs
  }
);

// Test the connection
export const testSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize: Connected to PostgreSQL database");
  } catch (error) {
    console.error("Sequelize: Unable to connect to the database:", error);
  }
};

// Initialize database tables (sync models)
export const initDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log("Database tables created successfully (Sequelize)");
  } catch (err) {
    console.error("Error initializing database (Sequelize):", err);
    throw err;
  }
};
