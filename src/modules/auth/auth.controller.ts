import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { UserService } from "../user/user.service";

export class AuthController extends BaseController {
  private userService: UserService;

  constructor(service: UserService) {
    //In JavaScript/TypeScript, classes that extends another class must call the parent constructor with super() before using this.
    // Because the JavaScript spec says → you can’t access this in a subclass until the parent’s constructor has run.
    super(); // calls BaseController’s constructor (even if it’s empty)
    this.userService = service;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getOne({ email });
      if (!user) {
        return this.sendNotFoundResponse(res);
      }

      if (user.password !== password) {
        return this.sendBadRequestResponse(res, "Invalid Credentials");
      }

      return this.sendResponse(res, "Logged in successfully!", 200, true, user);
    } catch (e) {
      return this.handleError(res, e, "login", "AuthController");
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const emailExists = await this.userService.getOne({ email });
      if (emailExists) {
        return this.sendBadRequestResponse(res, "Email already exists");
      }

      const usernameExists = await this.userService.getOne({ username });
      if (usernameExists) {
        return this.sendBadRequestResponse(res, "Username already exists");
      }

      const user = await this.userService.create({ username, email, password });
      return this.sendResponse(res, "Signed up successfully!", 200, true, user);
    } catch (e) {
      return this.handleError(res, e, "signup", "AuthController");
    }
  }
}
