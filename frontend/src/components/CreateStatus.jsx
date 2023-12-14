import React, { useState } from "react";
import axios from "axios";

export default function CreateStatus({ username }) {
    const [statusContentInput, setstatusContentInput] = useState("");
    const [error, setError] = useState("");

    function setStatusContent(event) {
        const statusContent = event.target.value;
        setstatusContentInput(statusContent);
    }

    async function submit() {
        setError("");

        if (!statusContentInput) return;

        try {
            const response = await axios.post("/api/status", {
                username: username,
                content: statusContentInput,
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div>
            <div className="new-post-container">
                <textarea
                    value={statusContentInput}
                    onInput={setStatusContent}
                    rows="4"
                ></textarea>
                <button onClick={submit}>Post</button>
            </div>
            {!!error && <h3>{error}</h3>}
        </div>
    );
}
