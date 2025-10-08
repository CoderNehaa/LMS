import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../constants/auth";
import { UserService } from "../modules/user/user.service";
import { EUserRoles } from "../modules/user/user.type";
import { clearCookies, validateToken } from "../utils/helper";

export class AuthMiddleware {
  private userService: UserService;

  constructor(service: UserService) {
    this.userService = service;

    // bind methods
    this.authentic = this.authentic.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.userExistWithEmail = this.userExistWithEmail.bind(this);
  }

  private async sendUnauthorized(
    res: Response,
    message: string = "Unauthorized"
  ) {
    clearCookies(res);
    return res.status(401).json({ message });
  }

  async authentic(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.cookies[ACCESS_TOKEN_NAME];
    const refreshToken = req.cookies[REFRESH_TOKEN_NAME];
    if (!accessToken && !refreshToken) {
      return this.sendUnauthorized(res);
    }

    // Validate tokens
    const decoded = validateToken(accessToken, refreshToken, res);
    if (!decoded || !decoded.id) {
      return this.sendUnauthorized(res);
    }

    // Check if user exists in DB
    let user = await this.userService.getById(decoded.id);
    if (!user) {
      return this.sendUnauthorized(res);
    }

    // Check if user is verified
    if (!user.isVerified) {
      return this.sendUnauthorized(res, "Account not verified");
    }

    // validate user role here
    if (!Object.values(EUserRoles).includes(user.role)) {
      return this.sendUnauthorized(res);
    }

    req.user = user;
    next();
  }

  isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== EUserRoles.admin) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  }

  async userExistWithEmail(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.getOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account with this email does not exist!",
      });
    }
    req.user = user;
    next();
  }
}
