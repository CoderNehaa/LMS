import { Server, Socket } from "socket.io";

export class SocketManager {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.registerHandlers();
  }

  private registerHandlers() {
    this.io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      this.registerMessageEvent(socket);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  private registerMessageEvent(socket: Socket) {
    socket.on("message", (msg: string) => {
      console.log("Message received:", msg);
      this.io.emit("message", msg); // broadcast to all
    });
  }
}
