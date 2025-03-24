import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo1 from "./logo1.png";
import "./Login.css";
const API_BASE_URL = "https://drishya-nlc6.onrender.com";
const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/attendance"); // Redirect to attendance page
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred during form submission.");
    }
  };

  return (
    <div className="xyz">
      <div className="navbar1">
        <li className="logo1">
          <img src={logo1} alt="logo"/>
        </li>
      </div>

      <div className="main1">
        <center>
          <div className="area1">
            <div className="s11">
              <h1>Sign In</h1>
            </div>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="search1">
                <input
                  type="email"
                  name="email"  // Added name attribute
                  value={formData.email}  // Bind input to state
                  onChange={handleChange}  // Added onChange to update state
                  className="box1"
                  placeholder="Email Address or Phone Number"
                  required
                />
              </div>
              <div className="search1">
                <input
                  type="password"
                  name="password"  // Added name attribute
                  value={formData.password}  // Bind input to state
                  onChange={handleChange}  // Added onChange to update state
                  className="box1"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="search1">
                <div className="b11">
                  <button className="try1" type="submit">
                    Sign in
                  </button>
                </div>
              </div>
            </form>
            <div className="cbox1">
              <div className="d21">
                <Link to="/random" style={{ textDecoration: "none", color: "white" }}>
                  <strong>Need Help?</strong>
                </Link>
              </div>
              <div className="d22">
                <Link to="/random" style={{ textDecoration: "none", color: "white" }}>
                  <strong>Forgotten <br/>password?</strong>
                </Link>
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

export default SignIn;
