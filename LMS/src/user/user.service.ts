import { BaseService } from "../utils/base.service";
import UserModel from "./user.model";
import { IUser } from "./user.type";

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }
  // async create(username: string, email: string, password: string) {
  //   const newUser = new UserModel({
  //     username,
  //     email,
  //     password,
  //   });
  //   await newUser.save();
  //   return newUser;
  // }

  // async getOne(property: Object): Promise<IUser | null> {
  //   //e.g. - property = {email:emailAddress}
  //   return await UserModel.findOne(property);
  // }
}
