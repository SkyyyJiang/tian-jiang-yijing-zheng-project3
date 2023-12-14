import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useActiveUser } from "../context/ActiveUserContext";
import "./login.css";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const { login } = useActiveUser();

  const navigate = useNavigate();

  function setUsername(event) {
    const username = event.target.value;
    setUsernameInput(username);
  }

  function setPassword(event) {
    const pswd = event.target.value;
    setPasswordInput(pswd);
  }

  async function submit() {
    if (!usernameInput || !passwordInput) {
      setError("username and password are mandatory");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        username: usernameInput,
        password: passwordInput,
      });
      login(usernameInput);
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e.response.status == 400) {
        setError(e.response.data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="welcome-text">Join Now</div>
        <div>
          <div>
            <div>Username </div>
            <input type="text" value={usernameInput} onInput={setUsername}></input>
          </div>
          <div>
            <div>Password </div>
            <input type="text" value={passwordInput} onInput={setPassword}></input>
          </div>
          <div className="spacing-small"></div>
          <button onClick={submit}>Create Account</button>
          <div className="spacing-small"></div>
          <div>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
      {!!error && <h3>{error}</h3>}
    </>
  );
}
