// define all the types, interfaces and enums for book module here

import { Document } from "mongoose";

export enum EBookCategory {
  fictional = "fictional",
}

export interface IBook extends Document {
  name: string;
  stock: number;
  price: number;
  category: EBookCategory;
}
