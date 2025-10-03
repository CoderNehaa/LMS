import dotenv from "dotenv";
dotenv.config();

export const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL || "";
export const PORT = Number(process.env.PORT) || 8088;
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "";
export const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || "";
