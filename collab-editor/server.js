const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let documentText = ""; // shared document (in-memory)
app.use(express.static("public"));
io.on("connection", (socket) => {
 // Send current document to new user
 socket.emit("load-document", documentText);
 // Receive changes from a user
 socket.on("text-change", (data) => {
 documentText = data;
 socket.broadcast.emit("update-text", data);
 });
});
server.listen(3000, () => {
 console.log("Server running at http://localhost:3000");
});