"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const connectDB = () => {
    if (environment_1.DB_CONNECTION_URL) {
        mongoose_1.default
            .connect(environment_1.DB_CONNECTION_URL)
            .then(() => {
            console.log("DB Connected successfully!");
        })
            .catch((e) => {
            console.log("Failed to connect DB:", e);
        });
    }
    else {
        console.log("Conection URL unavailable:", environment_1.DB_CONNECTION_URL);
    }
};
exports.connectDB = connectDB;
