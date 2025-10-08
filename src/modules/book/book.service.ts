// Service methods - for DB Queries
import { BaseService } from "../base/base.service";
import BookModel from "./book.schema";
import { IBook } from "./book.type";

export class BookService extends BaseService<IBook> {
  constructor() {
    super(BookModel);
  }
}
