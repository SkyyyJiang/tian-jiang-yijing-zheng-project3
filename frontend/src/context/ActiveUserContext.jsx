import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const ActiveUserContext = createContext();

export const ActiveUserProvider = ({ children }) => {
    const [activeUsername, setActiveUsername] = useState(null);

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get("/api/auth/isLoggedIn");
        setActiveUsername(response.data.username);
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

    const login = (username) => {
        setActiveUsername(username);
    };

    const logout = () => {
        setActiveUsername(null);
    }
    
    return (
        <ActiveUserContext.Provider value={{ activeUsername, login, logout }}>
            {children}
        </ActiveUserContext.Provider>
    );
};

export const useActiveUser = () => {
    return useContext(ActiveUserContext);
};
