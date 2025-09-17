import joi from "joi";
import { BaseValidator } from "../utils/base.validator";

export class UserValidator {
  static signupSchema = joi.object({
    username: joi.string().min(3).max(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  static loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  static signupValidator = BaseValidator.validate(UserValidator.signupSchema);
  static loginValidator = BaseValidator.validate(UserValidator.loginSchema);
}
