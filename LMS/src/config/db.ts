import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./environment";

let connectionPromise: Promise<typeof mongoose> | null = null;

// This function makes sure that DB connection is established once only
// even if the function is called more than once
export const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    console.log("DB is already connected!");
    return Promise.resolve(mongoose);
  }

  if (connectionPromise) {
    console.log("DB connection in progress...");
    return connectionPromise;
  }

  if (!DB_CONNECTION_URL) {
    console.log("Connection URL unavailable:", DB_CONNECTION_URL);
    return Promise.reject(new Error("DB connection URL not found"));
  }

  connectionPromise = mongoose
    .connect(DB_CONNECTION_URL)
    .then((mongooseInstance) => {
      console.log("DB Connected successfully!");
      return mongooseInstance;
    })
    .catch((error) => {
      console.log("Failed to connect DB:", error);
      connectionPromise = null; // Reset on failure
      throw error;
    });

  return connectionPromise;
};
