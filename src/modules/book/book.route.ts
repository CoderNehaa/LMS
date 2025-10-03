// API Routes
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import bookController from "./book.container";

const bookRouter = Router();

bookRouter.use(AuthMiddleware.authentic);
bookRouter.get("/all", bookController.getBooksList.bind(bookController));
bookRouter.get(
  "/availability/:id",
  bookController.checkBookAvailability.bind(bookController)
);

// below APIs should be accessible to only librarian
bookRouter.use(AuthMiddleware.isLibrarian);
bookRouter.post("/add", bookController.addNewBook.bind(bookController));
bookRouter.patch("/stock", bookController.updateBookStock.bind(bookController));

export default bookRouter;
