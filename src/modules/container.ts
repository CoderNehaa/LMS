import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EmailService } from "../utils/email-service";
import { AuthController } from "./auth/auth.controller";
import { OTPService } from "./otp/otp.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

// Services
const userService = new UserService();
const otpService = new OTPService();
const emailService = new EmailService();

// Middlewares
export const authMiddleware = new AuthMiddleware(userService);

// Controllers
export const userController = new UserController(userService);
export const authController = new AuthController(userService, otpService, emailService);
