import "./UserList.css";

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

export default UserList;
