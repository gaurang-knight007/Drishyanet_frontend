import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo1 from "../../assets/logo1.png";
import "./SignUp.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.prefillEmail || "";

  const [formData, setFormData] = useState({
    name: "",
    email: passedEmail,
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      setErrorMsg("Please enter a valid name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        navigate("/signin", { state: { prefillEmail: formData.email } });
      } else {
        setErrorMsg(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("An error occurred during signup.");
    }
  };

  return (
    <div className="abc">
      <div className="navbar2">
        <li className="logo2">
          <img src={logo1} alt="logo" />
        </li>
      </div>

      <div className="main2">
        <center>
          <div className="area2">
            <div className="s12">
              <h1>Sign Up</h1>
            </div>

            <form id="signupForm" onSubmit={handleSubmit} method="POST">
              <div className="search2">
                <input
                  type="text"
                  className="box1"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="search2">
                <input
                  type="email"
                  className="box1"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="search2">
                <input
                  type="password"
                  className="box1"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              {errorMsg && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMsg}
                </div>
              )}

              <div className="search2">
                <div className="b12">
                  <button className="try2" id="signupBtn" type="submit">
                    Sign up
                  </button>
                </div>
              </div>
            </form>

            <div className="cbox2">
              <div className="d23">
                <font color="white">
                  Need Help ?
                </font>
              </div>
            </div>

            <br />
            <br />
            <br />
          </div>
        </center>
      </div>
    </div>
  );
};

export default SignUp;
