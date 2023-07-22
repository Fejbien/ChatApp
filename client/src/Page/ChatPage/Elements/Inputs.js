import "./Inputs.css";

import { socket } from "../Socket";
import { useRef } from "react";

function Inputs({ isConnected, setMessages, messages, name }) {
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

        if (inputRef.current.value === "") return;

        socket.emit("messageSend", inputRef.current.value);
        setMessages([...messages, [socket.id, name, inputRef.current.value]]);

        inputRef.current.value = "";
    }

    return (
        <div className="formWrapChatPage">
            <form onSubmit={handleSubmit}>
                {!isConnected ? (
                    <div className="inputsFakeButton" onClick={connect}>
                        Connect
                    </div>
                ) : (
                    <div className="inputsFakeButton" onClick={disconnect}>
                        Disconnect
                    </div>
                )}
                <input
                    name="message"
                    type="text"
                    ref={inputRef}
                    placeholder="Aa"
                ></input>
                <button type="submit" disabled={!isConnected}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Inputs;
