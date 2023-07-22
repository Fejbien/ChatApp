import "./App.css";
import { useState } from "react";

import ChatPage from "./Page/ChatPage/ChatPage";
import NamePage from "./Page/NamePage/NamePage";

function App() {
    const [name, setName] = useState("");

    if (name !== "") {
        return (
            <div className="fullHeight">
                <ChatPage name={name} />
            </div>
        );
    } else {
        return (
            <div className="fullHeight">
                <NamePage setName={setName} />
            </div>
        );
    }
}

export default App;
