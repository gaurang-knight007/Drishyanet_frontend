import React from "react";
import { useNavigate } from "react-router-dom";
import "./Attendance.css";
import logo from "./logo1.png";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Attendance = () => {
    const navigate = useNavigate();
    const proceedToIndex3 = async() => {
        try{
          const response = await fetch(`${API_BASE_URL}/proceed`, { method: "POST" });
            if (response.ok)
            {
                navigate("/index3");
            }
            else
            {
                console.error("Error during proceed request:", response.statusText);
                alert('An error occurred during the "proceed" request.');
            }
        }
        catch (error)
        {
            console.error("Error during proceed request:", error);
            alert('An error occurred during the "proceed" request.');
        }
    };
    
    const proceedToIndex4 = async () => {
        try{
          const response = await fetch(`${API_BASE_URL}/proceed1`, { method: "POST" });

            if (response.ok) {
                navigate("/index4");
            }
            else {
                console.error("Error during proceed1 request:", response.statusText);
                alert('An error occurred during the "proceed1" request.');
            }
        }
        catch (error) {
            console.error("Error during proceed1 request:", error);
            alert('An error occurred during the "proceed1" request.');
        }
    };
    return(
        <div className="pqr">
            <div className="navbar3">
              <li className="logo3">
                <img src={logo} alt="logoo" />
              </li>
            </div>
            <div className="main3">
              <center>
                <div className="d13">
                  <div className="s3">
                    <h1>Enroll New Student</h1>
                  </div>
                  <div className="search3">
                    <div className="b3">
                      <button className="try3" id="submit" onClick={proceedToIndex3}>
                        proceed
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d33">
                  <div className="s3">
                    <h1>Take Attendance </h1>
                  </div>
                  <div className="search3">
                    <div className="b3">
                      <button className="try3" id="submit" onClick={proceedToIndex4}>
                        proceed
                      </button>
                    </div>
                  </div>
                </div>
              </center>
            </div>
        </div>
    )
};

export default Attendance;
