import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WriteStatus({ username }) {

    const [statusContentInput, setstatusContentInput] = useState('');
    const [error, setError] = useState("");

    function setStatusContent(event) {
        const statusContent = event.target.value;
        setstatusContentInput(statusContent);
    }

    async function submit() {
        setError('');

        if (!statusContentInput) return;

        if (!username) {
            setError("Sign in to create a status");
            return;
        }

        try {
            const response = await axios.post('/api/status', { username: username, content: statusContentInput })
            window.location.reload();
            
        } catch (e) {
            console.error(e)
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div>
            <div>
                <h1>send post</h1>
                <h1>send post</h1>
                <input type='text' value={statusContentInput} onInput={setStatusContent}></input>
                <button onClick={submit}>Post</button>
            </div>
            {!!error && <h3>{error}</h3>}
        </div>
    )
}