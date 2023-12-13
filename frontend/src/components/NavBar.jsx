import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const [activeUsername, setActiveUsername] = useState(null)

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/auth/isLoggedIn')
        setActiveUsername(response.data.username)
        console.log(activeUsername);
    }

    useEffect(() => { checkIfUserIsLoggedIn() }, []);

    async function logOutUser() {
        await axios.post('/api/auth/logout')
        setActiveUsername(null)
    }

    if (!activeUsername) {
        return (
            <div className='nav-container'>
                <div><Link to="/" className="nav-title">Not Twitter</Link></div>
                <ul>
                    <li><Link to="/login" className='clickable-text'>sign in</Link></li>
                    <li><Link to="/register" className='clickable-text'>register</Link></li>
                </ul>
            </div>
        )
    }

    return (
        <div className='nav-container'>
            <div><Link to="/" className="nav-title">Not Twitter</Link></div>
            <ul>
                <li>Welcome, <span>{activeUsername}</span></li>
                <li onClick={logOutUser}><span className='clickable-text'>log out</span></li>
            </ul>
        </div>
    )

}