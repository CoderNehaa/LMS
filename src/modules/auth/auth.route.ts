// auth.route.ts for auth module
import { Router } from "express";
import { BaseValidator } from "../base/base.validator";
import { AuthValidator } from "./auth.validator";
import { authController } from "../container";

const authRouter = Router();

authRouter.post(
  "/signup",
  BaseValidator.validate(AuthValidator.signupValidator),
  authController.signup.bind(authController)
);

authRouter.post(
  "/login",
  BaseValidator.validate(AuthValidator.loginValidator),
  authController.login.bind(authController)
);

export default authRouter;
