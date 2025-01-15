import "./JournalForm.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function JournalForm() {
    const [name, setNewName] = useState(""); 
    const [entries, setMessage] = useState([]); 
    const [entry, setEntry] = useState(""); 
    const [frontPage, setFrontPage] = useState("first");

    useEffect(() => {
        const fetchJournalForm = async () => {
            try{
                const response = await axios.get("http://localhost:4000/api/submit")
            } catch (error) {
                console.error("error fetching from data", error);
            }
        };
        fetchJournalForm();
    }, []);

    function handleBrowse() {
        setFrontPage("browse");{/*for browse button*/}
    }
    function handleSubmitPage() {
        setFrontPage("submitBrowse");{/*for submit button*/}
    }
    function handleChange(event) {
        setNewName(event.target.value);
    }
    function handleEntry(event) {
        setEntry(event.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (name && entry) { 
            const newEntry = { name, text: entry, date: new Date().toLocaleString() };
            setMessage([...entries, newEntry]); 
            setNewName(""); 
            setEntry("");
            setFrontPage("first");
        } 
        try {
            const response = await fetch("https://vilgera-api.azurewebsites.net/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEntry),
            });

            if(response.ok){
                const result = await response.json();
                alert("message submitted successfully");
                console.log("API Error", result);
                console.log("message submission successful");
                setMessage([]);
            } else {
                alert("failed to submit message", response.statusText);

            }
        } catch (error) {
            alert("an error occured");
            console.log("error", error);
        }
    }
    return (
        <div className="title">
            {frontPage === "first" && (
                <div>
                <h1>Journal</h1>
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
            {frontPage === "browse" && ( 
                <div>
                <h1>Messages</h1> 
                {entries.length > 0 ? ( 
                    entries.map((entry, index) => ( 
                        <div key={index} className="entry"> 
                            <p>Name:{entry.name}</p> 
                            <p>Message:{entry.text}</p>
                            <p><small>Date:{entry.date}</small></p>
                        </div>
                    ))
                ) : (
                    <p>No entries available. Submit your first entry!</p> 
                )}
                <button className="back-button" onClick={() => setFrontPage("first")}>
                    Go Back</button>
                </div>
                )}
                <footer>
                    <small>&copy; Anonymous Journal</small>
                    </footer>
      </div>
    );
}

export default JournalForm;
