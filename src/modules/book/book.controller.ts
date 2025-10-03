// Controller methods
import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { BookService } from "./book.service";

export class BookController extends BaseController {
  private bookService: BookService;

  constructor(service: BookService) {
    super();
    this.bookService = service;
  }

  async addNewBook(req: Request, res: Response) {
    try {
      const { bookData } = req.body;
      const newBook = await this.bookService.create(bookData);
      return this.sendResponse(
        res,
        "Book Added successfully",
        200,
        true,
        newBook
      );
    } catch (e) {
      return this.handleError(res, e, "addNewBook", "BookController");
    }
  }

  async updateBookStock(req: Request, res: Response) {
    try {
      return this.sendResponse(
        res,
        "Book stock updated successfully!",
        200,
        true,
        {}
      );
    } catch (e) {
      return this.handleError(res, e, "addNewBook", "BookController");
    }
  }

  async getBooksList(req: Request, res: Response) {
    try {
      const booksList = await this.bookService.getAll();
      return this.sendResponse(
        res,
        "Operation successful",
        200,
        true,
        booksList
      );
    } catch (e) {
      return this.handleError(res, e, "getBooksList", "BookController");
    }
  }

  async checkBookAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendBadRequestResponse(res, "Book ID is required!");
      }

      const book = await this.bookService.getOne({ id });
      if (!book) {
        return this.sendNotFoundResponse(res);
      }

      return this.sendResponse(
        res,
        book.stock > 0
          ? "Yay! This book is available"
          : "Oh Oops! This book is out of stock",
        200,
        true,
        book
      );
    } catch (e) {
      return this.handleError(
        res,
        e,
        "checkBookAvailability",
        "BookController"
      );
    }
  }
}
