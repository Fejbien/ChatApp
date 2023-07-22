import "./Messages.css";

function Messages({ usersMap, messages }) {
    // x[0] - User id
    // x[1] - User message
    // y    - Id in array

    const messagesDivs = messages.map((x, y) => {
        return (
            <p key={y}>
                {usersMap.get(x[0])} : {x[1]}
            </p>
        );
    });

    return <div className="messagesChatPage">{messagesDivs}</div>;
}

export default Messages;
