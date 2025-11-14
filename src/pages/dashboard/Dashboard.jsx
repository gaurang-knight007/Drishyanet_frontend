import { useState } from "react";
import { useEffect, useRef } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const PYTHON_SERVER_URL = process.env.REACT_APP_PYTHON_SERVER_URL || "http://localhost:5000";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [form, setForm] = useState({
    name: "",
    roll: "",
    branch: "",
    phone: "",
    file: null,
  });

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PYTHON_SERVER_URL}/api/students/list`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setStudents(data);
  };

  const addStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "file") formData.append("file", form.file);
      else formData.append(key, form[key]);
    });

    // ✅ Corrected endpoint (was /api/students/list)
    const res = await fetch(`${PYTHON_SERVER_URL}/api/students/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      alert("Unexpected server response. Please check backend logs.");
      return;
    }

    alert(data.message || data.error);
    fetchStudents();
  };

  const deleteStudent = async (name) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PYTHON_SERVER_URL}/api/students/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchStudents();
  };

  const viewAttendance = async () => {
    if (!subject || !date) return alert("Enter subject and date");
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${PYTHON_SERVER_URL}/api/view?subject=${subject}&date=${date}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.records) {
      setRecords(data.records);
      setMessage("");
    } else {
      setRecords([]);
      setMessage(data.message);
    }
  };

  const updateAttendance = async (record, newStatus) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PYTHON_SERVER_URL}/api/attendance/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject,
        name: record.name,
        date: record.date,
        status: newStatus,
      }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    viewAttendance();
  };

  const deleteAttendance = async (record) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PYTHON_SERVER_URL}/api/attendance/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject,
        name: record.name,
        date: record.date,
      }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    viewAttendance();
  };

  const proceedToAttendance = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/proceed`, { method: "POST" });
      if (response.ok) {
        navigate("/attendance");
      } else {
        console.error("Error during proceed request:", response.statusText);
        alert('An error occurred during the "proceed" request.');
      }
    } catch (error) {
      console.error("Error during proceed request:", error);
      alert('An error occurred during the "proceed" request.');
    }
  };

  const [showCamera, setShowCamera] = useState(false);
const [cameraStream, setCameraStream] = useState(null);

const videoRef = useRef();

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
    }
  } catch (err) {
    alert("Unable to access camera: " + err.message);
  }
};

useEffect(() => {
  if (showCamera) startCamera();
  else if (cameraStream) stopCamera();
}, [showCamera]);

const stopCamera = () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
  }
  setShowCamera(false);
};

const captureImage = () => {
  const canvas = document.createElement("canvas");
  const video = videoRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    setForm({ ...form, file });
  }, "image/jpeg");

  stopCamera();
};



  return (
    <div className="dashboard">
      <nav className="navbar-dash">
        <img src={logo} alt="Drisyanet logo" className="nav-logo" />
        <div className="nav-actions">
          <button className="nav-btn121" onClick={proceedToAttendance}>
            Go to Attendance
          </button>
          <button className="nav-btn121" onClick={() => navigate("/search")}>
            Go to Search
          </button>
          <button
            className="nav-btn121 logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="main-content">
        <section className="card121 view-attendance-card">
          <h3>View Attendance</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter date (yymmdd)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={viewAttendance}>See Attendance</button>
          </div>
          {message && <p className="message">{message}</p>}
          {records.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.status}</td>
                    <td>{r.date}</td>
                    <td>{r.time}</td>
                    <td className="btn-group">
                      <button
                        onClick={() =>
                          updateAttendance(
                            r,
                            r.status === "Present" ? "Absent" : "Present"
                          )
                        }
                      >
                        Change Status
                      </button>
                      <button onClick={() => deleteAttendance(r)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="card121 add-student-card">
          <h3>Add Student</h3>
          <form onSubmit={addStudent} className="form-grid">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Roll No"
              value={form.roll}
              onChange={(e) => setForm({ ...form, roll: e.target.value })}
            />
            <input
              type="text"
              placeholder="Branch"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="image-options">
  <label>Upload or Click Student Image:</label>
  <div className="btn-group-img">
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
    />

    <button
      type="button"
      onClick={() => setShowCamera(true)}
      className="camera-btn"
    >
      📸 Capture Image
    </button>
  </div>
</div>

            <button type="submit" className="full-btn">Add</button>
          </form>
          {showCamera && (
  <div className="camera-modal">
    <video ref={videoRef} autoPlay playsInline className="camera-view" />
    <div className="camera-actions">
      <button type="button" onClick={captureImage}>Capture</button>
      <button type="button" onClick={stopCamera}>Cancel</button>
    </div>
  </div>
)}

        </section>

        <section className="card121 registered-students-card">
          <h3>Registered Students</h3>
          <button onClick={fetchStudents}>Refresh List</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.branch}</td>
                  <td>{s.phone}</td>
                  <td className="actions-cell">
                    <button onClick={() => deleteStudent(s.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
