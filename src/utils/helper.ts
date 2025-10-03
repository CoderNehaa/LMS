import { Response } from "express";
import {
  JWT_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../config/environment";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY_TIME = "1h";
const REFRESH_TOKEN_EXPIRY_TIME = "7d";

export function generateAndSaveAuthTokens(res: Response, userId: string) {
  // Create access and refresh token
  const accessToken = jwt.sign({ id: userId }, JWT_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
  });
  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
  });
  // Save access and refresh token in cookies
  // res.cookie("", accessToken)
}
