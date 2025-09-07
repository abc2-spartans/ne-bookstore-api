import { mongoDb } from "../db/init.js";
import { ObjectId } from "mongodb";

const COLLECTION = "books";

class BookMongo {}

BookMongo.getAll = async () => {
  try {
    return await mongoDb.collection(COLLECTION).find({}).toArray();
  } catch (error) {
    console.error("DB error in getAll:", error);
    throw error;
  }
};

BookMongo.getById = async (id) => {
  try {
    return await mongoDb
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("DB error in getById:", error);
    throw error;
  }
};

BookMongo.create = async (book) => {
  try {
    const result = await mongoDb.collection(COLLECTION).insertOne(book);
    return { ...book, _id: result.insertedId };
  } catch (error) {
    console.error("DB error in create:", error);
    throw error;
  }
};

BookMongo.update = async (id, book) => {
  try {
    const result = await mongoDb
      .collection(COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: book },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    console.error("DB error in update:", error);
    throw error;
  }
};

BookMongo.delete = async (id) => {
  try {
    const result = await mongoDb
      .collection(COLLECTION)
      .findOneAndDelete({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("DB error in delete:", error);
    throw error;
  }
};

export default BookMongo;
