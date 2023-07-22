import "./Messages.css";

function Messages({ usersMap, messages, userId }) {
    // x[0] - User id
    // x[1] - User message
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

        let nick = usersMap.get(x[0]);
        const message = x[1];

        if (nick === undefined) nick = x[0];

        return (
            <div key={y} style={positioning}>
                <div className="messagesMessage" style={looksOfMessage}>
                    <b>{nick}:</b> {message}
                </div>
            </div>
        );
    });

    return <div className="messagesWindowChatPage">{messagesDivs}</div>;
}

export default Messages;
