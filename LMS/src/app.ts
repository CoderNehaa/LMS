import express, { Application, Router } from "express";
import ErrorHandler from "./middlewares/errorHandler.middleware";
import mongoose from "mongoose";
import { DB_CONNECTION_URL } from "./config/environment";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { SocketManager } from "./socket/socket";

interface RouteDefinition {
  path: string;
  router: Router;
}

class App {
  express: Application;
  port: number;
  server: http.Server;
  io: Server;

  constructor(port: number, routes: RouteDefinition[]) {
    this.express = express();
    this.port = port;

    // Create HTTP server from express app
    this.server = http.createServer(this.express);

    // Attach socket.io to the server
    this.io = new Server(this.server, {
      cors: { origin: "*" }, // configure as needed
    });

    new SocketManager(this.io);
    // Initialize DB connection, middlewares, routes and global error handler
    this.initializeDBConnection();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  initializeDBConnection() {
    mongoose
      .connect(DB_CONNECTION_URL)
      .then((mongooseInstance) => {
        console.log("DB Connected successfully!");
        return mongooseInstance;
      })
      .catch((error) => {
        console.log("Failed to connect DB:", error);
        throw error;
      });
  }

  initializeMiddlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
  }

  initializeRoutes(routes: RouteDefinition[]) {
    routes.forEach((route) => {
      this.express.use(`/api/${route.path}`, route.router);
    });
  }

  initializeErrorHandling() {
    // this.express.use(ErrorHandler);
  }

  listen() {
    this.express.listen(this.port, () => {
      console.log("App listening on port", this.port);
    });
  }
}

export default App;
