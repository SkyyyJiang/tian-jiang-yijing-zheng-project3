import axios from "axios";
import React from "react";
import { useActiveUser } from "../context/ActiveUserContext";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { activeUsername, logout } = useActiveUser();

  async function logOutUser() {
    await axios.post("/api/auth/logout");
    logout();
  }

  if (!activeUsername) {
    return (
      <div className="nav-container">
        <div><Link to="/" className="nav-title">Not Twitter</Link></div>
        <ul>
          <li><Link to="/login" className="clickable-text">sign in</Link></li>
          <li><Link to="/register" className="clickable-text">register</Link></li>
        </ul>
      </div>
    );
  }

  return (
    <div className="nav-container">
      <div><Link to="/" className="nav-title">Not Twitter</Link></div>
      <ul>
        <li><Link to={`/profile/${activeUsername}`}>{activeUsername}</Link></li>
        <li onClick={logOutUser}><span className="clickable-text">log out</span></li>
      </ul>
    </div>
  );
}
