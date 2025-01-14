import "./JournalForm.css";
import React, { useState } from 'react';

function JournalForm() {
    const [name, setNewName] = useState(""); 
    const [entries, setMessage] = useState([]); 
    const [entry, setEntry] = useState(""); 
    const [frontPage, setFrontPage] = useState("first");


    function handleBrowse() {
        setFrontPage("browse");{/*for browse button*/}
    }
    function handleSubmitPage() {
        setFrontPage("submitBrowse");{/*for submit btn*/}
    }
    function handleChange(event) {
        setNewName(event.target.value);
    }
    function handleEntry(event) {
        setEntry(event.target.value);
    }
    async function handleSubmit (event) {
        event.preventDefault(); 
        if (name && entry) { 
            const newEntry = { name, text: entry, date: new Date().toLocaleString() };
            setMessage([...entries, newEntry]); 
            setNewName(""); 
            setEntry("");
            setFrontPage("first");
        } 
        try{
            const response = await fetch("https://vilgera-api.azurewebsites.net", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entries),
            });
            if (response.ok){
                const result = await response.jsoon();
                alert("Thank you for submitting!");
                console.log("API Response: ", result);
                console.log("Submitted succesfully!");
            } else {
                alert("failed to submit message.");
                console.error("API Error", response.statusText);
            }
        } catch (error){
            alert("An error occurred.");
            console.error("error", error);
        }
    }
    return (
        <div className="title">
            {frontPage === "first" && (
                <div>
                <h1>Anonymous Journal</h1>
                    <button className="submit-button" onClick={handleSubmitPage}>Submit your first message!</button>{/*for submitting messages button*/}
                    <button className="browse-button" onClick={handleBrowse}>Browse messages</button>{/*for browsing messages button*/}
                </div>
            )}
            {frontPage === "submitBrowse" && (
                <div>{/*when u click the sub button, input boxes will appear*/}
                    <input
                        className="input-name"
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleChange}
                    /><br/>
                    <input
                        className="input-message"
                        type="text"
                        id="message"
                        placeholder="Enter your message"
                        value={entry}
                        onChange={handleEntry}
                    /><br/>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>{/*submitting ur messages*/}
                    <button className="go-back" onClick={() => setFrontPage("first")}>Go Back</button>{/*go back 2 da frontpage*/}
                </div>
            )}
            {frontPage === "browse" && {/*browse input messages*/}(
                <div className="message-list">
                    <h2 className="heading-2">Your Message:</h2>
                    {entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <div key={index} className="entry">
                                <h3>{entry.name}</h3>
                                <p>{entry.text}</p>
                                <small>{entry.date}</small>
                            </div>
                        ))
                    ) : (
                        <p>No entries yet!!</p>
                    )}
                    <button className="back" onClick={() => setFrontPage("first")}>Home</button>{/*go back 2 front page*/}
                </div>
            )}
            <footer>
                <small>&copy; Anonymous Journal</small>
                </footer>
        </div>
    );
}

export default JournalForm;