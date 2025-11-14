import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
import "./Login.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail = location.state?.prefillEmail || "";

  const [formData, setFormData] = useState({
    email: passedEmail,
    password: ""
  });

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

      const data = await response.json();

      if (response.ok && data.success)
      {
        localStorage.setItem("token", data.token);

        navigate("/dashboard"); // Redirect to dashboard page
      } 
      else 
      {
        alert(data.message || "Invalid email or password.");
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
          <img src={logo1} alt="logo" />
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="box1"
                  placeholder="Email Address or Phone Number"
                  required
                />
              </div>
              <div className="search1">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                <Link
                  to="/random"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <strong>Need Help?</strong>
                </Link>
              </div>
              <div className="d22">
                <Link
                  to="/random"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <strong>
                    Forgotten <br />
                    password?
                  </strong>
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
