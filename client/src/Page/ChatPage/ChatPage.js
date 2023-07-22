import "./ChatPage.css";
import { useEffect, useState } from "react";
import { socket } from "./Socket";

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

    socket.on("messageCast", (message) => {
        setMessages([...messages, message]);
    });

    socket.on("allUsers", (users) => {
        setUsers(new Map(JSON.parse(users)));
    });

    return (
        <div className="wrapChatPage">
            <div className="upperChatPage">
                <UserList usersMap={users} isConnected={isConnected} />
                <Messages messages={messages} />
            </div>
            <Inputs
                isConnected={isConnected}
                setMessages={setMessages}
                messages={messages}
            />
        </div>
    );
}

function UserList({ usersMap, isConnected }) {
    if (!isConnected)
        return (
            <div className="usersChatPage">
                <p>You are not connected!</p>
            </div>
        );

    const usersLi = Array.from(usersMap).map(([key, value]) => {
        return <li key={key}>{value}</li>;
    });

    return (
        <div className="usersChatPage">
            <p>List of users:</p>
            <ul>{usersLi}</ul>
        </div>
    );
}

function Messages({ messages }) {
    const messagesDivs = messages.map((x, y) => {
        return <p key={y}>{x}</p>;
    });

    return <div className="messagesChatPage">{messagesDivs}</div>;
}

function Inputs({ isConnected, setMessages, messages }) {
    function connect(e) {
        e.preventDefault();
        socket.connect();
    }

    function disconnect(e) {
        e.preventDefault();
        socket.disconnect();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        socket.emit("messageSend", formJson["message"]);
        setMessages([...messages, formJson["message"]]);
    }

    return (
        <div className="formWrapChatPage">
            <form onSubmit={handleSubmit}>
                <input name="message" type="text"></input>
                <button type="submit" disabled={!isConnected}>
                    Send
                </button>
                {!isConnected ? (
                    <button onClick={connect}>Connect</button>
                ) : (
                    <button onClick={disconnect}>Disconnect</button>
                )}
            </form>
        </div>
    );
}

export default ChatPage;
