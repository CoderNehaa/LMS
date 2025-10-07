// DB Schema definition

import mongoose from "mongoose";
import { EBookCategory, IBook } from "./book.type";
import { COLLECTION_NAMES } from "../../constants/collections";

const BookSchema = new mongoose.Schema<IBook>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: EBookCategory,
    required: true,
  },
});

const BookModel = mongoose.model(COLLECTION_NAMES.BOOK, BookSchema);
export default BookModel;
