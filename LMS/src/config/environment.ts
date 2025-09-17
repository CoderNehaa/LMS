import dotenv from "dotenv";
dotenv.config();

export const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL || "";
export const PORT = process.env.PORT;
