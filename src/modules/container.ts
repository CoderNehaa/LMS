import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "./auth/auth.controller";
import { BookController } from "./book/book.controller";
import { BookService } from "./book/book.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

// Services
const userService = new UserService();
const bookService = new BookService();

// Middlewares
export const authMiddleware = new AuthMiddleware(userService);

// Controllers
export const userController = new UserController(userService);
export const authController = new AuthController(userService);
export const bookController = new BookController(bookService);
