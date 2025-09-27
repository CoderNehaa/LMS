import { BookController } from "./book.controller";
import { BookService } from "./book.service";

const bookService = new BookService();
const bookController = new BookController(bookService);

export default bookController;
