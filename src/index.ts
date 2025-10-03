import App from "./app";
import { PORT } from "./config/environment";
import authRouter from "./modules/auth/auth.route";
import bookRouter from "./modules/book/book.route";
import userRouter from "./modules/user/user.route";

// routers
const routers = [
  { path: "auth", router: authRouter },
  { path: "user", router: userRouter },
  { path: "books", router: bookRouter },
];

// define and start server
const app = new App(PORT, routers);
app.listen();
