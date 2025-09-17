import { Request, Response } from "express";
import { UserService } from "./user.service";
import { BaseController } from "../base/base.controller";

const userService = new UserService();
export class UserController extends BaseController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.getOne({ email });
      if (!user) {
        return this.sendNotFoundResponse(res);
      }

      if (user.password !== password) {
        return this.sendBadRequestResponse(res, "Invalid Credentials");
      }

      return this.sendResponse(res, "Logged in successfully!", 200, true, user);
    } catch (e) {
      return this.handleError(res, e, "login", "UserController");
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const emailExists = await userService.getOne({ email });
      if (emailExists) {
        return this.sendBadRequestResponse(res, "Email already exists");
      }

      const usernameExists = await userService.getOne({ username });
      if (usernameExists) {
        return this.sendBadRequestResponse(res, "Username already exists");
      }

      const user = await userService.create({ username, email, password });
      return this.sendResponse(res, "Signed up successfully!", 200, true, user);
    } catch (e) {
      return this.handleError(res, e, "signup", "UserController");
    }
  }
}
