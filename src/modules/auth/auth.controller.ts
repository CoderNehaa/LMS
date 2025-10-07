import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { UserService } from "../user/user.service";
import { generateAndSaveAuthTokens } from "../../utils/helper";
import { OTPService } from "../otp/otp.service";

export class AuthController extends BaseController {
  private userService: UserService;
  private otpService: OTPService;

  constructor(userService: UserService, otpService: OTPService) {
    //In JavaScript/TypeScript, classes that extends another class must call the parent constructor with super() before using this.
    // Because the JavaScript spec says → you can’t access this in a subclass until the parent’s constructor has run.
    super(); // calls BaseController’s constructor (even if it’s empty)
    this.userService = userService;
    this.otpService = otpService;
  }

  async login(req: Request, res: Response) {
    try {
      let user = req.user;

      let passwordMatches = await user.comparePassword(req.body.password);
      if (!passwordMatches) {
        return this.sendBadRequestResponse(res, "Invalid Credentials");
      }

      generateAndSaveAuthTokens(res, String(user._id));
      return this.sendSuccessResponse(res, user, "Logged in successfully!");
    } catch (e) {
      return this.handleError(res, e, "login", "AuthController");
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await this.userService.getOne({ email });
      if (existingUser) {
        return this.sendBadRequestResponse(res, "Email already exists");
      }

      const user = await this.userService.create({ username, email, password });
      const otp = await this.otpService.generateAndSaveOTP(email);

      // TODO:Send this OTP on email with proper email text of new account
      return this.sendSuccessResponse(res, user, "Signed up successfully!");
    } catch (e) {
      return this.handleError(res, e, "signup", "AuthController");
    }
  }

  async verifyAccount(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      let user = req.user;

      if (user.isVerified) {
        return this.sendBadRequestResponse(res, "Account already verified");
      }

      let otpDoc = await this.otpService.getOne({
        email,
        otp,
      });
      if (!otpDoc) {
        return this.sendBadRequestResponse(res, "OTP expired!");
      }

      let verifiedUser = await this.userService.updateById(String(user._id), {
        isVerified: true,
      });
      generateAndSaveAuthTokens(res, String(user._id));
      return this.sendSuccessResponse(
        res,
        verifiedUser,
        "Account verified successfully!"
      );
    } catch (e) {
      return this.handleError(res, e, "verifyAccount", "AuthController");
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const user = req.user;
      let randomPassword = this.userService.generateRandomPassword();
      // TODO : send random password on email
      let updatedUser = await this.userService.updateById(String(user._id), {
        password: randomPassword,
      });

      return this.sendSuccessResponse(
        res,
        updatedUser,
        "New password sent on email successfully!"
      );
    } catch (e) {
      return this.handleError(res, e, "forgotPassword", "AuthController");
    }
  }
}
