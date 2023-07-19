const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const PORT = 4000;

app.get("/test", (req, res) => {
    res.send(`Express server test zostaje :3`);
});

const users = new Map();

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on(`disconnect`, (reason) => {
        users.delete(socket.id);
        console.log(reason);
    });

    socket.on(`userNameAdd`, (nick) => {
        users.set(socket.id, nick);
        console.log(socket.id + " : " + nick);
    });

    socket.on(`messageSend`, (message) => {
        console.log(message);
        socket.broadcast.emit("messageCast", message);
    });
});

httpServer.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});

function ShowAllUsers() {
    console.log("User list: ");
    users.forEach((user) => {
        console.log(user);
    });
}
