import "./Inputs.css";

import { socket } from "../Socket";
import { useRef } from "react";

function Inputs({ isConnected, setMessages, messages }) {
    const inputRef = useRef(null);

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

        socket.emit("messageSend", inputRef.current.value);
        setMessages([...messages, [socket.id, inputRef.current.value]]);

        inputRef.current.value = "";
    }

    return (
        <div className="formWrapChatPage">
            <form onSubmit={handleSubmit}>
                <input name="message" type="text" ref={inputRef}></input>
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

export default Inputs;
