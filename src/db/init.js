import { MongoClient } from "mongodb";
import { getConfig } from "../config/index.js";
import dotenv from "dotenv";
dotenv.config();

const config = getConfig();

// MongoDB connection
const mongoUri = config.database?.mongodb?.uri;
const mongoClient = new MongoClient(mongoUri);
let mongoDb;

export const initMongoDB = async () => {
  await mongoClient.connect();
  mongoDb = mongoClient.db();
  console.log("Connected to MongoDB database");
};

export { mongoDb };

export default {
  initMongoDB,
};
