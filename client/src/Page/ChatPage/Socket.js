import { io } from "socket.io-client";

const PORT = 4000;
export const socket = io(`http://localhost:${PORT}`, {
    autoConnect: false,
});
