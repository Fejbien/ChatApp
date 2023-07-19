import "./ChatPage.css";
import { useEffect, useState } from "react";
import { socket } from "./Socket";

function ChatPage({ name }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("userNameAdd", name);
            console.log(socket.id);
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
        console.log(message);
        setMessages([...messages, message]);
    });

    return (
        <div>
            <Messages messages={messages} />
            <Inputs
                isConnected={isConnected}
                setMessages={setMessages}
                messages={messages}
            />
        </div>
    );
}

function Messages({ messages }) {
    const messagesDivs = messages.map((x, y) => {
        return <p key={y}>{x}</p>;
    });

    return <div>{messagesDivs}</div>;
}

function Inputs({ isConnected, setMessages, messages }) {
    function connect() {
        socket.connect();
    }

    function disconnect() {
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
        <div>
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
