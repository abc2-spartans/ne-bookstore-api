import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    genre: { type: String },
    price: { type: Number },
    // Add other fields as needed
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
