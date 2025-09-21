import { sequelize } from "../db/init.js";
import { DataTypes } from "sequelize";

export const BookModel = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);
