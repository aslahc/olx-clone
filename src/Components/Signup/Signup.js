import React, { useContext, useState } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import FirebaseContext from "../../store/FirebaseContext";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const firebase = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username.trim()) {
      setUsernameError("Username cannot be empty");
      return;
    }
    if (!email.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }
    if (!phone.trim()) {
      setPhoneError("Phone cannot be empty");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password cannot be empty");
      return;
    }

    // Clear error messages

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection("users").add({
              id: result.user.uid,
              username: username,
              phone: phone,
            });
          })
          .then(() => {
            history.push("/login");
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
          {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsernameError("");

              setUsername(e.target.value);
            }}
            id="fname"
            name="name"
          />
          <br />
          {usernameError && <p className="error">{usernameError}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmailError("");

              setemail(e.target.value);
            }}
            id="fname"
            name="email"
          />
          <br />
          {emailError && <p className="error">{emailError}</p>}
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhoneError("");

              setphone(e.target.value);
            }}
            id="lname"
            name="phone"
          />
          <br />
          {phoneError && <p className="error">{phoneError}</p>}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPasswordError("");

              setpassword(e.target.value);
            }}
            id="lname"
            name="password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
