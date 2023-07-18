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
    res.send(`Express server test`);
});

io.on("connection", (socket) => {
    console.log(`client connected: ${socket.id}`);

    socket.join(`clock-room`);

    socket.on(`disconnect`, (reason) => {
        console.log(reason);
    });
});

setInterval(() => {
    io.to(`clock-room`).emit(`time`, new Date());
}, 1000);

httpServer.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});
