import { Document, ObjectId } from "mongoose";

export enum EUserRoles {
  USER = "user",
  admin = "admin", //incharge of library - only one who adds books
}

export interface IUser extends Document {
  _id: String | ObjectId;
  email: string;
  username: string;
  role: EUserRoles;
  isVerified: boolean;
  password?: string; //to prevent sending password in user object
  comparePassword(password: string): Promise<boolean>;
}
