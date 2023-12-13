import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import NavBar from "./NavBar";
import WriteStatus from "./WriteStatus";

export default function Home() {
    const [activeUsername, setActiveUsername] = useState(null)

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/auth/isLoggedIn')
        setActiveUsername(response.data.username)
    }

    useEffect(() => { checkIfUserIsLoggedIn() }, []);

    console.log(`home ${activeUsername}`)
    return (
        <>
            <NavBar />
            {/* <WriteStatus username={activeUsername}/> */}
            {activeUsername && <WriteStatus username={activeUsername}/>}
        </>
    )
}