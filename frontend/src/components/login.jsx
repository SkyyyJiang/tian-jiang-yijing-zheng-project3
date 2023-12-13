import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

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
      const response = await axios.post("/api/auth/login", {
        username: usernameInput,
        password: passwordInput,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        setError(e.response.data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingLeft: "680px",
        flexDirection: "column",
      }}
    >
      <div>
        <span>Username: </span>
        <input type="text" value={usernameInput} onInput={setUsername}></input>
      </div>
      <div>
        <span>Password: </span>
        <input type="text" value={passwordInput} onInput={setPassword}></input>
      </div>

      <button onClick={submit}>Sign In</button>

      <div>
        Don't have an account? <Link to="/register">Create new account</Link>
      </div>

      {!!error && <h3>{error}</h3>}
    </div>
  );
}
