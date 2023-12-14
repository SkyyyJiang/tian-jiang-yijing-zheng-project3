import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useActiveUser } from "../context/ActiveUserContext";
import "./Profile.css";

import NavBar from "./NavBar";
import CreateStatus from "./CreateStatus";
import DisplayStatus from "./DisplayStatus";

export default function Profile() {
    const { username } = useParams();
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
            setUser(response.data);
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
                description: descriptionInput,
            });
            setIsEditting(false);
            setUser((currUser) => ({ ...currUser, description: descriptionInput }));
        } catch (e) {
            console.error(e);
            setError("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    console.log(isEditting);

    if (!user) return;

    return (
        <div>
            <NavBar />
            <div className="spacing"></div>
            <div className="user-profile-container">
                <div>{user.username}</div>
                <div className="secondary-text">Joined {new Date(user.joinedDate).toLocaleDateString()}</div>

                {activeUsername != username ? (
                    <div>{user.description}</div>
                ) : (
                    <div>
                        {isEditting &&
                            <div>
                                <input type="text" value={descriptionInput} onInput={setDescription}></input>
                                <button onClick={submit}>Save</button>
                            </div>
                        }
                        {!isEditting &&
                            <div>
                                <div>{user.description}</div>
                                <button onClick={edit}>edit</button>
                            </div>
                        }
                    </div>
                )}
            </div>
            {!!error && <div>{error}</div>}
            <div className="spacing"></div>
            <div className="post-container">
                {activeUsername == username && <CreateStatus username={activeUsername} />}
                <DisplayStatus activeUsername={activeUsername} searchUsername={username} />
            </div>
        </div>
    );
}