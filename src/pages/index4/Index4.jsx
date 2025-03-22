import React, { useState, useRef, useEffect } from "react";
import "./Index4.css";
import logo from "./logo1.png";

const Index4 = () => {
  const [subject, setSubject] = useState("");
  const [output, setOutput] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewing, setViewing] = useState(false);

  const [recognizedName, setRecognizedName] = useState(""); // State to hold recognized name
  const [facePosition, setFacePosition] = useState(null); // State to hold face position (coordinates)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Set up webcam feed on component mount
  useEffect(() => {
    const setupWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };
    setupWebcam();
  }, []);

  // Capture frame from the video feed
  const captureFrame = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the captured frame as a base64 image
    const frame = canvas.toDataURL("image/jpeg");

    // Send the frame to the backend for face recognition
    try {
      const response = await fetch(`${API_BASE_URL}/recognize-face`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: frame, subject_name: subject }),
      });

      const data = await response.json();
      if (data.name) {
        setRecognizedName(data.name);
        setFacePosition(data.facePosition);
      } else {
        setRecognizedName("Unknown");
        setFacePosition(null);
      }
    } catch (error) {
      console.error("Error in face recognition:", error);
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleRunScript = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject name.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(`${API_BASE_URL}/run-python`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_name: subject }),
      });

      const data = await response.text();
      setOutput(data);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Failed to start attendance.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAttendance = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject name.");
      return;
    }

    setViewing(true);
    setAttendanceData([]);

    try {
      const response = await fetch(`${API_BASE_URL}/view-attendance?subject_name=${subject}`);
      const data = await response.json();

      if (data.length === 0) {
        setOutput("No attendance records found for this subject.");
      } else {
        setOutput("");
        setAttendanceData(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("Failed to retrieve attendance.");
    } finally {
      setViewing(false);
    }
  };

  // Function to draw the bounding box on the video feed
  const drawBoundingBox = () => {
    if (!facePosition || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous frame
    const { top, right, bottom, left } = facePosition;

    // Draw bounding box around the recognized face
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();

    // Draw the name of the recognized person
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(recognizedName, left + 6, top - 6);
  };

  // Capture a frame every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 3000);

    return () => clearInterval(interval);
  }, [subject]);

  return (
    <div className="container4">
      <img src={logo} alt="Logo" className="logo4" />
      <h1>Enter the Subject Name</h1>
      <input
        type="text"
        value={subject}
        onChange={handleSubjectChange}
        placeholder="Enter subject name"
      />
      <button onClick={handleRunScript} disabled={loading}>
        {loading ? "Starting Attendance..." : "Start Attendance"}
      </button>
      <button onClick={handleViewAttendance} disabled={viewing}>
        {viewing ? "Loading Attendance..." : "View Attendance"}
      </button>

      {output && <p className="output-message">{output}</p>}

      <ul>
        {attendanceData.map((entry) => (
          <li key={entry._id}>
            {entry.name} - {entry.time} ({entry.date})
          </li>
        ))}
      </ul>

      {/* Video Feed */}
      <video ref={videoRef} autoPlay muted width="640" height="480" style={{ border: "1px solid black" }} />
      
      {/* Canvas for drawing bounding box */}
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", top: "0", left: "0" }} />
    </div>
  );
};

export default Index4;
