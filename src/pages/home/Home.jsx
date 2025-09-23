import React from "react";
import "./Home.css";
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import face from "../../assets/face.png";
import future from "../../assets/future.png";
import logo1 from "../../assets/logo1.png";

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const redirectToSignUp = () => {
        if (isValidEmail(email)) {
            navigate("/signup", { state: { prefillEmail:email, mode:'register' } });
        } else {
            alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="random">
            <div className="navbar">
                <li className="logo">
                    <img src={logo1} alt="Company Logo" />
                </li>
                <li className="buttons">
                    <Link to="/signin" style={{ textDecoration: "none", color: "white" }}>
                        <strong>Sign In</strong>
                    </Link>
                </li>
            </div>
            <div className="main">
                <div className="area">
                    <h1 style={{ textDecoration: "none", color: "silver" }}>
                        Smart Attendance &amp; Security
                    </h1>
                    <br />
                    <h3 style={{ textDecoration: "none", color: "silver" }}>
                        Detect anywhere in real-time.
                    </h3>
                    <div className="search">
                        <input type="email" className="box" id="emailInput" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div className="b1">
                            <button className="try" onClick={redirectToSignUp}>
                                Get started
                            </button>
                        </div>
                    </div>
                    <h4 style={{ textDecoration: "none", color: "silver" }}>
                        Be smart, be future-ready. Join us.
                    </h4>
                </div>
            </div>
            <div id="container1" className="container1">
                <div className="image">
                    <img src={future} alt="Future Concept" />
                </div>
                <div className="text">
                    <h1>Use on your phone or CCTV camera</h1>
                    <p>
                        Available on Google Play Store and also as a website.
                        <br />
                        Use anywhere, anytime. Explore more.
                    </p>
                </div>
            </div>
            <div id="container3" className="container3">
                <div className="text">
                    <h1>Smart Attendance System</h1>
                    <p>
                        Uses facial recognition technology
                        <br />
                        to automate tasks like attendance
                        <br />
                        in schools, colleges, and firms.
                    </p>
                </div>
                <div className="image">
                    <img src={face} alt="Face Recognition System" />
                </div>
            </div>
            <div id="question" className="question">
                <h1>FAQs</h1>
                <div className="quest">
                    <div className="textbox">
                      <Link to="/faq" style={{ textDecoration: "none", color: "white" }}>What is object detection?</Link>
                    </div>
                </div>
                <div className="quest">
                    <div className="textbox">
                      <Link to="/faq" style={{ textDecoration: "none", color: "white" }}>How much does Drishyanet cost?</Link>      
                    </div>
                </div>
                <div className="quest">
                    <div className="textbox">
                      <Link to="/faq" style={{ textDecoration: "none", color: "white" }}>What can I do?</Link>
                    </div>
                </div>
                <div className="quest">
                    <div className="textbox">
                      <Link to="/faq" style={{ textDecoration: "none", color: "white" }}>What can I search?</Link>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footercon">
                    <div className="flex1">
                        <h5>Questions? Call 8423867123</h5>
                    </div>
                    <ul className="list1">
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>FAQ</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Investor Relations</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Ways to Surveillance</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Corporate Information</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Premium</Link></li>
                    </ul>
                    <ul className="list1">
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Home</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Jobs</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Terms of Use</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Contact Us</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Premium</Link></li>
                    </ul>
                    <ul className="list1">
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Account</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Redeem Gift Cards</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Privacy</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Speed Test</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>#</Link></li>
                    </ul>
                    <ul className="list1">
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Media Center</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Buy Gift Cards</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Cookie Preferences</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>Legal Notices</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "white" }}>#</Link></li>
                    </ul>
                </div>
                <div className="end">
                    <h2>GAURANG GAUTAM</h2>
                </div>
            </div>
        </div>
    );
};

export default Home;
