import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActiveUser } from "../context/ActiveUserContext";

import NavBar from "./NavBar";
import CreateStatus from "./CreateStatus";
import DisplayStatus from "./DisplayStatus";

export default function Profile({ username }) {
    const { activeUsername } = useActiveUser();
    const [user, setUser] = useState([]);
    const [isEditting, setIsEditting] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [error, setError] = useState("");

    function setDescription(event) {
        const description = event.target.value;
        setDescriptionInput(description);
    }

    async function getUserProfile() {
        try {
            const response = await axios.get(`/api/auth/${username}`);
            setUser(response);
        } catch (error) {
            console.error("Error getting user:", error);
        }
    }

    function edit() {
        setIsEditting(true);
    }

    async function submit() {
        setError("");
        if (!descriptionInput) return;
        try {
            const response = await axios.put("/api/auth/editProfile", {
                username: username,
                content: descriptionInput,
            });
            setIsEditting(false);
            // setDescription(descriptionInput)
        } catch (e) {
            console.error(e);
            setError("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    console.log(`active ${activeUsername} user ${username}`);

    return (
        <div>
            <NavBar />
            <div>
                <h1>don't block my info</h1>
                <div>{user.username}</div>
                <div>{new Date(user.joinedDate).toLocaleDateString()}</div>
                {activeUsername != username && <div>{user.description}</div>}
                {activeUsername == username && isEditting ? (
                    <div>
                        <input type="text" value={descriptionInput} onInput={setDescription}></input>
                        <button onClick={submit}>Save</button>
                    </div>
                ) : (
                    <div>
                        <div>{user.description}</div>
                        <button onClick={edit}>edit</button>
                    </div>
                )}
            </div>
            {activeUsername == username && <CreateStatus username={activeUsername} />}
            <DisplayStatus activeUsername={activeUsername} searchUsername={username} />
        </div>
    );
}