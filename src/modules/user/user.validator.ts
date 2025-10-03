import joi from "joi";

export class UserValidator {
  static signupValidator = joi.object({
    username: joi.string().min(3).max(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  static loginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });
}
