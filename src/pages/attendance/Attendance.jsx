import { useState } from "react";

import "./Attendance.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PYTHON_SERVER_URL = process.env.REACT_APP_PYTHON_SERVER_URL;


function Attendance() {
  const [subject, setSubject] = useState("");
  const [streaming, setStreaming] = useState(false);
  const navigate = useNavigate();

  const startAttendance = () => {
    if (!subject) return alert("Enter subject name");
    setStreaming(true);
  };

  const stopAttendance = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${PYTHON_SERVER_URL}/api/attendance/stop`, { method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`,
    },
     });
    setStreaming(false);
  };

  const proceedToDashboard = async() => {
    try{
      const response = await fetch(`${API_BASE_URL}/proceed1`, { method: "POST" });
        if (response.ok) {
            navigate("/dashboard");
        } else {
            console.error("Error during proceed request:", response.statusText);
            alert('An error occurred during the "proceed" request.');
        }
    }
    catch (error) {
        console.error("Error during proceed request:", error);
        alert('An error occurred during the "proceed" request.');
    }
  };

  return (
    <div className="glatt">
      <nav className="navbar-att">
  <img src={logo} alt="logo" className="nav-logo" />

  <div className="nav-actions">
    <button className="nav-btn111" onClick={proceedToDashboard}>
      Back to Dashboard
    </button>
    <button
      className="nav-btn111 logout-btn"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/signin");
      }}
    >
      Logout
    </button>
  </div>
</nav>
      <div className="attendance">
      <header>
        <h2>Attendance Page</h2>
      </header>

      <input
        type="text"
        placeholder="Enter subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div className="btn-group11">
        <button onClick={startAttendance}>Start Attendance</button>
        <button onClick={stopAttendance}>Stop Attendance</button>
      </div>

      {streaming && (
        <img
          src={`${PYTHON_SERVER_URL}/api/attendance/start?subject=${subject}`}
          alt="video"
          width="500"
        />
      )}
    </div>
    </div>
  );
}

export default Attendance;
