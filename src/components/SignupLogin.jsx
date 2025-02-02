import React, { useState } from "react";
import "./SignupLogin.css";
import backgroundImage from "../assets/Logimg.jpg";

const SignupLogin = ({ setIsLoggedIn, setToken }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!formData.fullName || !formData.username || !formData.password) {
      setError("All fields are required for signup.");
      return;
    }
    alert(`Account created for ${formData.fullName}`);
  };

  const handleLogin = () => {
    if (!formData.username || !formData.password) {
      setError("Username and Password are required.");
      return;
    }
    localStorage.setItem("token", "dummyToken");
    setIsLoggedIn(true);
    setToken("dummyToken");
  };

  return (
    <div className="auth-container">
      {/* Left Section - Image with Overlay */}
      <div className="auth-left">
        <img src={backgroundImage} alt="Adventure" className="background-image" />
        <div className="text-overlay">
          <h1>{isSignup ? "Join the Adventure" : "Welcome Back!"}</h1>
          <p>
            {isSignup
              ? "Start documenting your travels and preserving your memories."
              : "Login to continue your travel journey and share experiences."}
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="auth-right">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {error && <p className="error-message">{error}</p>}

        {isSignup && (
          <>
            <label htmlFor="fullName"></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </>
        )}

        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn" onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
