import { Router } from "express";
import { UserValidator } from "./user.validator";
import userController from "./user.container";
import { BaseValidator } from "../base/base.validator";

const userRouter = Router();

userRouter.post(
  "/signup",
  BaseValidator.validate(UserValidator.signupValidator),
  userController.signup.bind(userController)
);

userRouter.post(
  "/login",
  BaseValidator.validate(UserValidator.loginValidator),
  userController.login.bind(userController)
);

export default userRouter;
