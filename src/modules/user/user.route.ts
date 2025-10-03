import { Router } from "express";
import { authMiddleware, userController } from "../container";

const userRouter = Router();
userRouter.use(authMiddleware.authentic);

userRouter.get("/data/:userId", userController.updateUser.bind(userController));
userRouter.put("/", userController.updateUser.bind(userController));
userRouter.delete("/", userController.deleteUser.bind(userController));

export default userRouter;
