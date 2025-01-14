import "./JournalForm.css";
import React, { useState } from 'react';

function JournalForm() {
    const [name, setNewName] = useState(""); 
    const [entries, setMessage] = useState([]); 
    const [entry, setEntry] = useState(""); 
    const [frontPage, setFrontPage] = useState("first");


    function handleBrowse() {
        setFrontPage("browse");
    }
    function handleSubmitPage() {
        setFrontPage("submitBrowse");
    }
    function handleChange(event) {
        setNewName(event.target.value);
    }
    function handleEntry(event) {
        setEntry(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault(); 
        if (name && entry) { 
            const newEntry = { name, text: entry, date: new Date().toLocaleString() };
            setMessage([...entries, newEntry]); 
            setNewName(""); 
            setEntry("");
            setFrontPage("first");
        } 
        //tryyy
        function handleBrowse(event) {
            <div className="name-browse">
                <p>Thank you for submitting</p>
            </div>
        }
    }
    return (
        <div className="title">
            {frontPage === "first" && (
                <div>
                <h1>Anonymous Journal</h1>
                    <button className="submit-button" onClick={handleSubmitPage}></button>
                    <button className="browse-button" onClick={handleBrowse}></button>
                </div>
            )}
            {firstPage === "submitBrowse" && (
                <div>
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
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            )}
            
            
            <div className="message-list">
                <h2 className="heading-2">Your Message:</h2>
                {entries.length === 0 ? (
                    <p>Submit your first entry!</p>
                ) : (
                    entries.map((entry, index) => (
                        <div key={index} className="entry">
                            <h3>{entry.name}</h3>
                            <p>{entry.text}</p>
                            <small>{entry.date}</small>
                        </div>
                    ))
                )}
            </div>
            <footer>
                <small>&copy; Anonymous Journal</small>
                </footer>
        </div>
    );
}

export default JournalForm;