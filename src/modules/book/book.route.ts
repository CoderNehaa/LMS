// API Routes
import { Router } from "express";
import { authMiddleware, bookController } from "../container";

const bookRouter = Router();

bookRouter.use(authMiddleware.authentic);
bookRouter.get("/all", bookController.getBooksList.bind(bookController));
bookRouter.get(
  "/availability/:id",
  bookController.checkBookAvailability.bind(bookController)
);

// below APIs should be accessible to only librarian
bookRouter.use(authMiddleware.isLibrarian);
bookRouter.post("/add", bookController.addNewBook.bind(bookController));
bookRouter.patch("/stock", bookController.updateBookStock.bind(bookController));

export default bookRouter;
