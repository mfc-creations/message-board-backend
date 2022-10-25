import express from "express";
import * as socketIO from "socket.io";
import http from "http";
import { connectDB } from "./config/connectDb";
import AuthRoutes from "./routes/auth.routes";
import MessageRoutes from "./routes/message.routes";
import dotenv from "dotenv";
import MessageService from "./services/message.service";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config({ path: "../config.env" });

let server = http.createServer(app);
connectDB();

let io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use("/api", [new AuthRoutes().router, new MessageRoutes().router]);

io.on("connection", (socket) => {
  socket.on("send-message", (data, callback) => {
    MessageService.saveMesage(data).then((res) => {
      io.emit("message", res);
      callback();
    });
  });

  socket.on("delete-message", (data) => {
    MessageService.deleteMessage(data.id).then((res) => {
      io.emit("message-deleted", data);
    });
  });
});

const port = 5000;
server.listen(port);
