/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import FirebaseContext from "../../store/FirebaseContext";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [emaiError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email Can't be empty");
    }
    if (!password.trim()) {
      setPasswordError("Password Cant't be empty");
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          setError("User not found. Please check your email.");
        } else if (err.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if(err.code === "auth/internal-error"){
          setError("Invalid email");
        }
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => {
              setEmailError("");

              setEmail(e.target.value);
            }}
          />
          {emaiError && <p className="error">{emaiError}</p>}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => {
              setPasswordError("");
              setpassword(e.target.value);
            }}
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
