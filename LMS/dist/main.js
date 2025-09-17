"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user/user.route"));
const book_route_1 = __importDefault(require("./book/book.route"));
const environment_1 = require("./config/environment");
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_route_1.default);
app.use("/book", book_route_1.default);
app.listen(environment_1.PORT, () => {
    (0, db_1.connectDB)();
    console.log("Server is listening on port", environment_1.PORT);
});
