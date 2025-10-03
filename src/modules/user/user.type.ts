import { Document, ObjectId } from "mongoose";

export enum EUserRoles {
  student = "student",
  librarian = "librarian", //incharge of library - only one who adds books
}

export interface IUser extends Document {
  _id: String | ObjectId;
  email: string;
  password: string;
  username: string;
  role: EUserRoles;
}
