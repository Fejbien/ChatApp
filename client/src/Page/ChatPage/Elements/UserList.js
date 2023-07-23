import "./UserList.css";

import Popup from "reactjs-popup";

function UserList({ usersMap, isConnected, userId }) {
    if (!isConnected)
        return (
            <div className="usersChatPage">
                <p style={{ fontSize: "2vw" }}>You are not connected!</p>
            </div>
        );

    const usersLi = Array.from(usersMap).map(([key, value]) => {
        if (userId === key) value = value + " (You)";
        return (
            <div className="userNote" key={key}>
                <Popup
                    trigger={<div>{value}</div>}
                    position={"right center"}
                    closeOnDocumentClick
                >
                    ID: {key}
                </Popup>
            </div>
        );
    });

    return (
        <div className="usersChatPage">
            <p>Users</p>
            <div className="userNoteWrap">{usersLi}</div>
        </div>
    );
}

export default UserList;
