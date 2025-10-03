import App from "./app";
import { PORT } from "./config/environment";
import bookRouter from "./modules/book/book.route";
import userRouter from "./modules/user/user.route";

// routers
const routers = [
  { path: "users", router: userRouter },
  { path: "books", router: bookRouter },
];

// define and start server
const app = new App(PORT, routers);
app.listen();
