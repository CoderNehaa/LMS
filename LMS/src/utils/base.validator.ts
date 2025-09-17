import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export abstract class BaseValidator {
  static validate(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      // format error
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message || "Bad Request!",
          data: error,
        });
      }
      next();
    };
  }
}
