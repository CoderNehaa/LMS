import { BaseService } from "../base/base.service";
import UserModel from "./user.model";
import { IUser } from "./user.type";

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }
}
