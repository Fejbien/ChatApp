import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");

    useEffect(() => {
        const PORT = 4000;
        const socket = io(`http://localhost:${PORT}`);

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000);
        });

        socket.on("disconnect", () => {
            //setTime("server disconnected");
        });
    }, []);

    if (name !== "") {
        return <div>{name}</div>;
    } else {
        return (
            <div>
                <NamePage setName={setName} />
            </div>
        );
    }
}

function NamePage({ setName }) {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        setName(formJson["name"]);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
