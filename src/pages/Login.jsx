import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext"; // Adjust the import path as needed
import "./Login.css";
import logo from "../images/akiraAI-logo.svg";
import leftImage from "../images/login-page-img.svg";
import passwordicon from "../images/password-hide-icon.svg";
import { userContext } from "../authContext/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userid, setUserid] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [errorValid, setErrorValid] = useState("");
  // var userID;
  let userData = {
    user_id: "",
  };
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://data-quality-backend.lab.neuralcompany.team/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      localStorage.setItem("userid", data.user_id);
      localStorage.setItem("username", username);

      userData.user_id = data.user_id;
      // console.log("userid", userid);

      // console.log(data);
      // console.log(data);
      // console.log(data.user_id);

      if (response.ok) {
        login(data.access_token);
        navigate("/data-sources");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login attempt failed:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateUsername = (event) => {
    if (/^[a-zA-Z]+(\s[a-zA-Z]+)*([a-zA-Z])$/.test(username)) {
    }
  };

  return (
    <userContext.Provider value={userData}>
      <div className="login-wrapper">
        <div className="login-left-container">
          <img src={leftImage} alt="Login illustration" />
        </div>
        <div className="login-right-container">
          <div className="login-right-container-logo">
            <img src={logo} alt="AkiraAI logo" />
          </div>
          <div className="login-form-wrapper">
            <p>Login</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="username">
                <input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onKeyUp={validateUsername}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="password">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="password-hide-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img src={passwordicon} alt="Toggle password visibility" />
                </div>
              </div>
              {error && (
                <div className="error-message" style={{ color: "red" }}>
                  {error}
                </div>
              )}
              <div className="submit-btn">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="login-msg">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <span>Signup</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default Login;
