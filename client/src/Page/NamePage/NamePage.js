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
            <form onSubmit={handleSubmit} className="wrap">
                <label htmlFor="name">Nick</label>
                <input name="name" type="text"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NamePage;
