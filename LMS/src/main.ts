import express from "express";
import userRouter from "./modules/user/user.route";
import bookRouter from "./modules/book/book.route";
import { PORT } from "./config/environment";
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening on port", PORT);
});
