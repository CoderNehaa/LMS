// auth.route.ts for auth module
import { Router } from "express";
import { BaseValidator } from "../base/base.validator";
import { AuthValidator } from "./auth.validator";
import { authController, authMiddleware } from "../container";

const authRouter = Router();

authRouter.post(
  "/signup",
  BaseValidator.validate(AuthValidator.signupValidator),
  authController.signup.bind(authController)
);

authRouter.post(
  "/login",
  BaseValidator.validate(AuthValidator.loginValidator),
  authMiddleware.userExistWithEmail,
  authController.login.bind(authController)
);

authRouter.post(
  "/verify-account",
  BaseValidator.validate(AuthValidator.verifyAccountValidator),
  authMiddleware.userExistWithEmail,
  authController.verifyAccount.bind(authController)
);

authRouter.post(
  "/forgot-password",
  BaseValidator.validate(AuthValidator.emailValidator),
  authMiddleware.userExistWithEmail,
  authController.forgotPassword.bind(authController)
);

export default authRouter;
