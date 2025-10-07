import joi from "joi";

export class AuthValidator {
  static signupValidator = joi.object({
    username: joi.string().min(3).max(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  static loginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  static verifyAccountValidator = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().min(6).max(6).required(),
  });
  
  static emailValidator = joi.object({
    email: joi.string().email().required(),
  });

}
