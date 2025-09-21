import mongoose from "mongoose";
import { getConfig } from "../config/index.js";
import dotenv from "dotenv";
dotenv.config();

const config = getConfig();
const mongoUri = `${config.database?.mongodb?.uri}/${config.database?.mongodb?.dbName}`;
console.log({ mongoUri });
export const initMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    throw error;
  }
};

export default {
  initMongoDB,
};
