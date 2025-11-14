// src/pages/search/Search.jsx
//import { useState } from "react";
//import "./Search.css";
//import { useNavigate } from "react-router-dom";
//import logo from "../../assets/logo1.png";
//
//const PYTHON_SERVER_URL = process.env.REACT_APP_PYTHON_SERVER_URL;
//
//function Search() {
//  const [query, setQuery] = useState("");
//  const [results, setResults] = useState([]);
//  const [message, setMessage] = useState("");
//  const navigate = useNavigate();
//
//  const handleSearch = async () => {
//    if (!query) return alert("Enter name, roll, or branch to search.");
//    const token = localStorage.getItem("token");
//
//    try {
//      const res = await fetch(
//        `${PYTHON_SERVER_URL}/api/search?query=${encodeURIComponent(query)}`,
//        {
//          headers: {
//            "Authorization": `Bearer ${token}`,
//          },
//        }
//      );
//      const data = await res.json();
//      if (data.results && data.results.length > 0) {
//        setResults(data.results);
//        setMessage("");
//      } else {
//        setResults([]);
//        setMessage("No matching records found.");
//      }
//    } catch (err) {
//      console.error("Error fetching search results:", err);
//      setMessage("An error occurred during search.");
//    }
//  };
//
//  return (
//    <div className="searchpage-main">
//      <nav className="navbar-searchpage">
//        <img src={logo} alt="logo" className="nav-logo-searchpage" />
//        <div className="nav-actions-searchpage">
//          <button className="nav-btn-searchpage" onClick={() => navigate("/dashboard")}>
//            Back to Dashboard
//          </button>
//          <button
//            className="nav-btn-searchpage logout-btn-searchpage"
//            onClick={() => {
//              localStorage.removeItem("token");
//              navigate("/signin");
//            }}
//          >
//            Logout
//          </button>
//        </div>
//      </nav>
//
//      <div className="searchpage-content">
//        <header className="searchpage-header">
//          <h2>Search Student Records</h2>
//        </header>
//
//        <div className="searchpage-input-group">
//          <input
//            type="text"
//            placeholder="Enter name, roll, or branch"
//            value={query}
//            onChange={(e) => setQuery(e.target.value)}
//          />
//          <button onClick={handleSearch}>Search</button>
//        </div>
//
//        {message && <p className="searchpage-message">{message}</p>}
//
//        {results.length > 0 && (
//          <table className="searchpage-table">
//            <thead>
//              <tr>
//                <th>Name</th>
//                <th>Roll No</th>
//                <th>Branch</th>
//                <th>Phone</th>
//              </tr>
//            </thead>
//            <tbody>
//              {results.map((r, i) => (
//                <tr key={i}>
//                  <td>{r.name}</td>
//                  <td>{r.roll}</td>
//                  <td>{r.branch}</td>
//                  <td>{r.phone}</td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//        )}
//      </div>
//    </div>
//  );
//}
//
//export default Search;
//


// src/pages/search/Search.jsx
import { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const PYTHON_SERVER_URL = process.env.REACT_APP_PYTHON_SERVER_URL || "http://localhost:5000";

function Search() {
  const [name, setName] = useState("");
  const [streaming, setStreaming] = useState(false);
  const navigate = useNavigate();

  const startSearch = () => {
    if (!name) return alert("Enter the student's name to search.");
    setStreaming(true);
  };

  const stopSearch = async () => {
  try {
    await fetch(`${PYTHON_SERVER_URL}/api/security/stop`, {
      method: "POST",
    });
  } catch (err) {
    console.error("Error stopping search:", err);
  }
  setStreaming(false);
};


  return (
    <div className="searchpage-main">
      <nav className="navbar-searchpage">
        <img src={logo} alt="logo" className="nav-logo-searchpage" />
        <div className="nav-actions-searchpage">
          <button className="nav-btn-searchpage" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button
            className="nav-btn-searchpage logout-btn-searchpage"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="searchpage-content">
        <header className="searchpage-header">
          <h2>Security Mode — Detect Specific Student</h2>
        </header>

        <div className="searchpage-input-group">
          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!streaming ? (
            <button onClick={startSearch}>Start Search</button>
          ) : (
            <button onClick={stopSearch}>Stop Search</button>
          )}
        </div>

        {streaming && (
          <div className="searchpage-video-wrapper">
            <img
              src={`${PYTHON_SERVER_URL}/api/security/search?name=${encodeURIComponent(name)}`}
              alt="Security Feed"
              className="searchpage-video"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
