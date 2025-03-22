import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index3.css";
import logo from "./logo1.png";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Index3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    phone: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    // Check if form fields are empty before sending data to the backend
    if (!formData.name || !formData.rollNo || !formData.phone || !formData.image) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("rollNo", formData.rollNo);
    data.append("phone", formData.phone);
    data.append("image", formData.image);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        alert("User registered successfully!");
        navigate("/attendance");
      } else {
        alert(result.message ||"An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="mno">
      <div className="navbar3">
        <li className="logo3">
          <img src={logo} alt="logooo" />
        </li>
      </div>
      <div className="main3">
        <center>
          <div className="area3">
            <div className="s113">
              <h1>New Entry</h1>
            </div>
            <form id="registrationForm" onSubmit={handleSubmit3} encType="multipart/form-data">
              <div className="search33">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="box33"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  required
                  onChange={handleChange3}
                />
              </div>
              <div className="search33">
                <label htmlFor="rollNo">Roll No:</label>
                <input
                  type="text"
                  className="box33"
                  id="rollNo"
                  name="rollNo"
                  placeholder="Roll No"
                  value={formData.rollNo}
                  required
                  onChange={handleChange3}
                />
              </div>
              <div className="search33">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  className="box33"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  required
                  onChange={handleChange3}
                />
              </div>
              <div className="search33">
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  className="box33"
                  name="image"
                  id="image"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
              </div>
              <div className="search33">
                <div className="b113">
                  <button type="submit" className="try33">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Index3;
