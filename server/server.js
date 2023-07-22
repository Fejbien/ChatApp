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

        io.emit(`allUsers`, JSON.stringify(Array.from(users)));
        console.log(reason);
    });

    socket.on(`userNameAdd`, (nick) => {
        users.set(socket.id, nick);

        io.emit(`allUsers`, JSON.stringify(Array.from(users)));
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
