import App from "./app";
import { PORT } from "./config/environment";
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";

// routers
const routers = [
  { path: "auth", router: authRouter },
  { path: "user", router: userRouter },
];

// define and start server
const app = new App(PORT, routers);
app.listen();
