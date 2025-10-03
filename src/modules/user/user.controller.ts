import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { UserService } from "./user.service";

export class UserController extends BaseController {
  private userService: UserService;

  constructor(service: UserService) {
    super();
    this.userService = service;
  }

  async getById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (userId === String(req.user._id)) {
        return this.sendSuccessResponse(res, req.user);
      }

      const user = await this.userService.getById(userId);
      return this.sendSuccessResponse(res, user);
    } catch (e) {
      return this.handleError(res, e, "getById", "UserController");
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const { updateBody } = req.body;
      const updatedUser = await this.userService.updateById(
        String(userId),
        updateBody
      );
      return this.sendResponse(
        res,
        "Account updated successfully!",
        200,
        true,
        updatedUser
      );
    } catch (e) {
      return this.handleError(res, e, "updateUser", "UserController");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const deletedUser = await this.userService.deleteById(String(userId));
      if (!deletedUser) {
        return this.sendServerErrorResponse(
          res,
          "Failed to delete account! Try later"
        );
      }

      return this.sendResponse(
        res,
        "Account deleted successfully!",
        200,
        true,
        deletedUser
      );
    } catch (e) {
      return this.handleError(res, e, "deleteUser", "UserController");
    }
  }
}
