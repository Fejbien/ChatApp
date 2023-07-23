import "./Messages.css";

import { useRef, useEffect } from "react";
import Popup from "reactjs-popup";

function Messages({ usersMap, messages, userId }) {
    const scrollingDivRef = useRef(null);

    function scrollToBottom() {
        const div = scrollingDivRef.current;
        div.scrollTop = div.scrollHeight;
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // x[0] - User id
    // x[1] - User nick
    // x[2] - User message
    // y    - Id in array
    const messagesDivs = messages.map((x, y) => {
        const whosMessage = userId === x[0];

        const positioning = {
            display: "flex",
            flexDirection: whosMessage ? "row-reverse" : "row",
        };

        const looksOfMessage = {
            backgroundColor: whosMessage ? "#0084ff" : "#e4e6eb",
            color: whosMessage ? "white" : "black",
        };

        const id = x[0];
        const nick = x[1];
        const message = x[2];

        return (
            <div key={y} style={positioning}>
                <div className="messagesMessage" style={looksOfMessage}>
                    <Popup
                        trigger={
                            <div>
                                <b>{nick}:</b> {message}
                            </div>
                        }
                        position={["left center", "right center"]}
                        closeOnDocumentClick
                        keepTooltipInside=".messagesWindowChatPage"
                    >
                        ID: {id}
                    </Popup>
                </div>
            </div>
        );
    });

    return (
        <div ref={scrollingDivRef} className="messagesWindowChatPage">
            {messagesDivs}
        </div>
    );
}

export default Messages;
