import "./NamePage.css";

function NamePage({ setName }) {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        setName(formJson["name"]);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="wrapNamePage">
                <label htmlFor="name">Your nick:</label>
                <input name="name" type="text" placeholder="Aa"></input>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}

export default NamePage;
