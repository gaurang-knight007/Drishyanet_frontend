import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Attendance from "./pages/attendance/Attendance";
import Index3 from "./pages/index3/Index3";
import Index4 from "./pages/index4/Index4";
import "./App.css";

function App()
{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/index3" element={<Index3 />} />
                <Route path="/index4" element={<Index4 />} />
            </Routes>
        </Router>
    );
}
export default App;

