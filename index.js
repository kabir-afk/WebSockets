const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./public"));

app.get("/", (res) => {
  return res.sendFile("./public/index.html");
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    // console.log("new user message ❗----------> ", message);
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
