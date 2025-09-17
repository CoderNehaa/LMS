"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const base_controller_1 = require("../utils/base.controller");
const userService = new user_service_1.UserService();
class UserController extends base_controller_1.BaseController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getOne({ email });
            if (!user) {
                return this.sendNotFoundResponse(res);
            }
            if (user.password !== password) {
                return this.sendBadRequestResponse(res, "Invalid Credentials");
            }
            return this.sendResponse(res, "Logged in successfully!", 200, true, user);
        }
        catch (e) {
            return this.handleError(res, e, "login", "UserController");
        }
    }
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            const emailExists = await userService.getOne({ email });
            if (emailExists) {
                return this.sendBadRequestResponse(res, "Email already exists");
            }
            const usernameExists = await userService.getOne({ username });
            if (usernameExists) {
                return this.sendBadRequestResponse(res, "Username already exists");
            }
            const user = await userService.create({ username, email, password });
            return this.sendResponse(res, "Logged in successfully!", 200, true, user);
        }
        catch (e) {
            return this.handleError(res, e, "signup", "UserController");
        }
    }
}
exports.UserController = UserController;
