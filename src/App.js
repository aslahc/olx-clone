import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Post from "./store/PostContext";

/**
 * ?  =====Import Components=====
*/
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Create from "./pages/Create";
import View from "./pages/ViewPost";
import FirebaseContext, { AuthContext } from "./store/FirebaseContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/view">
            <View />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
