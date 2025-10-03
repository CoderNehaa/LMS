import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export abstract class BaseValidator {
  static validate(
    schema: Joi.ObjectSchema,
    location: "query" | "params" | "body" = "body"
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = req[location];
      const { error } = schema.validate(data);
      // TODO:format error
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
