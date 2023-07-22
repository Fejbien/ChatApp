import "./Messages.css";

function Messages({ usersMap, messages, userId }) {
    // x[0] - User id
    // x[1] - User message
    // y    - Id in array

    const messagesDivs = messages.map((x, y) => {
        const positioning = {
            display: "flex",
            flexDirection: userId === x[0] ? "row-reverse" : "row",
        };

        const looksOfMessage = {
            backgroundColor: userId === x[0] ? "#0084ff" : "#e4e6eb",
            color: userId === x[0] ? "white" : "black",
        };
        return (
            <div key={y} style={positioning}>
                <div className="messagesMessage" style={looksOfMessage}>
                    <b>{usersMap.get(x[0])}:</b> {x[1]}
                </div>
            </div>
        );
    });

    return <div className="messagesWindowChatPage">{messagesDivs}</div>;
}

export default Messages;
