import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { UserService } from "../user/user.service";
import { generateAndSaveAuthTokens } from "../../utils/helper";
import { OTPService } from "../otp/otp.service";
import mongoose from "mongoose";
import {
  ACCESS_TOKEN_NAME,
  AUTH_RESPONSE_MESSAGES,
  REFRESH_TOKEN_NAME,
} from "../../constants/auth";

const { NEW_SIGNUP, EXISTING_SIGNUP } = AUTH_RESPONSE_MESSAGES;

export class AuthController extends BaseController {
  private userService: UserService;
  private otpService: OTPService;

  constructor(userService: UserService, otpService: OTPService) {
    //In JavaScript/TypeScript, classes that extends another class must call the parent constructor with super() before using this.
    // Because the JavaScript spec says → you can’t access this in a subclass until the parent’s constructor has run.
    super(); // calls BaseController’s constructor (even if it’s empty)
    this.userService = userService;
    this.otpService = otpService;

    // bind all methods
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.verifyAccount = this.verifyAccount.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.logout = this.logout.bind(this);
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
      if (existingUser && existingUser.isVerified) {
        return this.sendBadRequestResponse(res, "Email already exists");
      }

      const otp = await this.otpService.generateAndSaveOTP(email);
      if (existingUser && !existingUser.isVerified) {
        return this.sendSuccessResponse(
          res,
          existingUser,
          EXISTING_SIGNUP(email)
        );
      }

      const user = await this.userService.create({ username, email, password });
      console.log(otp);
      // TODO:Send this OTP on email with proper email text of new account
      return this.sendSuccessResponse(res, user, NEW_SIGNUP(email));
    } catch (e) {
      return this.handleError(res, e, "signup", "AuthController");
    }
  }

  async verifyAccount(req: Request, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { email, otp } = req.body;
      let user = req.user;

      if (user.isVerified) {
        await session.abortTransaction();
        return this.sendBadRequestResponse(res, "Account already verified");
      }

      let otpDoc = await this.otpService.getOne(
        {
          email,
          otp,
        },
        session
      );
      if (!otpDoc) {
        await session.abortTransaction();
        return this.sendBadRequestResponse(res, "Invalid OTP!");
      }

      let verifiedUser = await this.userService.updateById(
        String(user._id),
        {
          isVerified: true,
        },
        session
      );
      generateAndSaveAuthTokens(res, String(user._id));

      await session.commitTransaction();
      return this.sendSuccessResponse(
        res,
        verifiedUser,
        "Account verified successfully!"
      );
    } catch (e) {
      await session.abortTransaction();
      return this.handleError(res, e, "verifyAccount", "AuthController");
    } finally {
      session.endSession();
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const user = req.user;
      let randomPassword = this.userService.generateRandomPassword();
      console.log(randomPassword);
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

  async logout(req: Request, res: Response) {
    let payload = {
      httpOnly: true,
      secure: true,
      sameSite: true,
      path: "/",
    };
    res.clearCookie(ACCESS_TOKEN_NAME, payload);
    res.clearCookie(REFRESH_TOKEN_NAME, payload);
    return this.sendSuccessResponse(res, null, "Logged out successfully!");
  }
}
