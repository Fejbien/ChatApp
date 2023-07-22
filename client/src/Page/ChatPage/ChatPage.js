import "./ChatPage.css";
import { useEffect, useState } from "react";
import { socket } from "./Socket";

import UserList from "./Elements/UserList";
import Messages from "./Elements/Messages";
import Inputs from "./Elements/Inputs";

function ChatPage({ name }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("userNameAdd", name);
        });

        socket.on("connect_error", () => {
            setIsConnected(false);
            setTimeout(() => socket.connect(), 5000);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });
    }, [name]);

    socket.on("messageCast", ({ id, nick, message }) => {
        setMessages([...messages, [id, nick, message]]);
    });

    socket.on("allUsers", (users) => {
        setUsers(new Map(JSON.parse(users)));
    });

    return (
        <div className="wrapChatPage">
            <div className="upperChatPage">
                <UserList
                    usersMap={users}
                    isConnected={isConnected}
                    userId={socket.id}
                />
                <Messages
                    usersMap={users}
                    messages={messages}
                    userId={socket.id}
                />
            </div>
            <Inputs
                isConnected={isConnected}
                setMessages={setMessages}
                messages={messages}
                name={name}
            />
        </div>
    );
}

export default ChatPage;
