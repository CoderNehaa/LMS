import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  // TODO : These methods are created just for setup, will be completed later
  static authentic(req: Request, res: Response, next: NextFunction) {
    next();
  }
  static isLibrarian(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
