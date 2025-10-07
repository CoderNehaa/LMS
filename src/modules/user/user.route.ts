import { Router } from "express";
import { authMiddleware, userController } from "../container";

const userRouter = Router();
userRouter.use(authMiddleware.authentic);

userRouter.get("/me", userController.getLoggedInUser);
userRouter.get("/data/:userId", userController.getById);

// TODO: Apply validator on update API
// TODO: Soft delete user
// TODO: when joi is not applied, then nothing can be sent in req
userRouter.put("/", userController.updateUser);
userRouter.delete("/", userController.deleteUser);

userRouter.patch("/password", userController.resetPassword);

export default userRouter;
