import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import './Header.css';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const [activeUsername, setActiveUsername] = useState(null)

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/auth/isLoggedIn')
        setActiveUsername(response.data.username)
        console.log(activeUsername);
    }

    useEffect(() => {
        checkIfUserIsLoggedIn()
    }, []);

    async function logOutUser() {

        await axios.post('/api/auth/logout')
        setActiveUsername(null)
    }

    if (!activeUsername) {

        return (
            <div className='header'>
                <Link to="/login" >Sign in</Link>
                <Link to="/register" >Register</Link>
            </div>
        )

    }

    return (
        <div className='header'>
            <div>Welcome, {activeUsername}</div>
            <button onClick={logOutUser}>Log Out</button>
        </div>

    )

}