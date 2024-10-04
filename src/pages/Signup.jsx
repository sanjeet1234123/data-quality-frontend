import "./Signup.css";
import logo from "../images/akiraAI-logo.svg";
import leftImage from "../images/signup-img.svg";
import { Link } from "react-router-dom";
import passwordicon from "../images/password-hide-icon.svg";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (usernameError || passwordError) {
      setError("Please fix the errors before submitting.");
      return;
    }

    axios
      .post("https://data-quality-backend.lab.neuralcompany.team/signup", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setUserName("");
        setPassword("");
        setError("");
        // Handle successful signup (e.g., redirect to login page or show success message)
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data.error);
          setMessage("");
        }
      });
  };

  const validateUsername = (event) => {
    const value = event.target.value;
    setUserName(value);
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left-container">
        <img src={leftImage} alt="Signup illustration" />
      </div>
      <div className="signup-right-container">
        <div className="signup-right-container-logo">
          <img src={logo} alt="AkiraAI logo" />
        </div>
        <div className="signup-form-wrapper">
          <p>Signup</p>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "10px",
                fontWeight: "400",
              }}
            >
              {error}
            </p>
          )}
          {message && (
            <p
              style={{
                color: "green",
                fontSize: "14px",
                marginTop: "10px",
                fontWeight: "400",
              }}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="username">
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={validateUsername}
                onKeyUp={validateUsername}
                required
              />
              {usernameError && (
                <div
                  className="error-message"
                  style={{ color: "red", fontSize: "12px", marginTop: "8px" }}
                >
                  {usernameError}
                </div>
              )}
            </div>
            <div className="password">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={validatePassword}
                onKeyUp={validatePassword}
                required
              />
              <div
                className="password-hide-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src={passwordicon} alt="Toggle password visibility" />
              </div>
              {passwordError && (
                <div
                  className="error-message"
                  style={{ color: "red", fontSize: "12px", marginTop: "8px" }}
                >
                  {passwordError}
                </div>
              )}
            </div>
            <div className="submit-btn">
              <button type="submit">Create Account</button>
            </div>
            <div className="signup-msg">
              <p>
                Already Have An Account?{" "}
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

// import "./Signup.css";
// import logo from "../images/akiraAI-logo.svg";
// import leftImage from "../images/signup-img.svg";
// import { Link } from "react-router-dom";
// import passwordicon from "../images/password-hide-icon.svg";
// import { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!username.trim() || !password.trim()) {
//       setError("Username and password are required.");
//       return;
//     }

//     axios
//       .post("http://10.0.0.166:5050/signup", { username, password })
//       .then((response) => {
//         console.log(response);
//         setMessage(response.data.message);
//         setUserName("");
//         setPassword("");
//         // Handle successful signup (e.g., redirect to login page or show success message)
//       })

//       .catch((error) => {
//         console.log(error);
//         if (error.response) {
//           setError(error.response.data.error);
//         }
//       });
//   };

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-left-container">
//         <img src={leftImage} alt="Signup illustration" />
//       </div>
//       <div className="signup-right-container">
//         <div className="signup-right-container-logo">
//           <img src={logo} alt="AkiraAI logo" />
//         </div>
//         <div className="signup-form-wrapper">
//           <h2>Signup</h2>
//           {error && (
//             <p
//               style={{
//                 color: "red",
//                 fontSize: "14px",
//                 marginTop: "10px",
//                 fontWeight: "400",
//               }}
//             >
//               {error}
//             </p>
//           )}
//           {message && (
//             <p
//               style={{
//                 color: "green",
//                 fontSize: "14px",
//                 marginTop: "10px",
//                 fontWeight: "400",
//               }}
//             >
//               {message}
//             </p>
//           )}
//           <form onSubmit={handleSubmit} className="signup-form">
//             <div className="username">
//               <input
//                 type="text"
//                 placeholder="User Name"
//                 value={username}
//                 onChange={(e) => setUserName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="password">
//               <input
//                 placeholder="Password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div
//                 className="password-hide-icon"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 <img src={passwordicon} alt="Toggle password visibility" />
//               </div>
//             </div>
//             <div className="submit-btn">
//               <button type="submit">Create Account</button>
//             </div>
//             <div className="signup-msg">
//               <p>
//                 Already Have An Account?{" "}
//                 <Link to="/" style={{ textDecoration: "none" }}>
//                   <span>Login</span>
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
