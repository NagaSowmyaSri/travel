import React, { useState, useEffect } from "react";
import LoginPage from "./components/SignupLogin";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
