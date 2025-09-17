"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
userRouter.post("/signup", (req, res) => userController.signup(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
exports.default = userRouter;
