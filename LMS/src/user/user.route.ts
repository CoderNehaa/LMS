import { Router } from "express";
import { UserController } from "./user.controller";
import { UserValidator } from "./user.validator";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", UserValidator.signupValidator, (req, res) =>
  userController.signup(req, res)
);

userRouter.post("/login", UserValidator.loginValidator, (req, res) =>
  userController.login(req, res)
);

export default userRouter;
