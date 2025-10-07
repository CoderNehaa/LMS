import { Router } from "express";
import { authMiddleware, userController } from "../container";

const userRouter = Router();
userRouter.use(authMiddleware.authentic);

userRouter.get("/data/:userId", userController.getById.bind(userController));
userRouter.put("/", userController.updateUser.bind(userController));
userRouter.delete("/", userController.deleteUser.bind(userController));

userRouter.patch(
  "/password",
  userController.resetPassword.bind(userController)
);

export default userRouter;
