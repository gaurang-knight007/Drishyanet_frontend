import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Attendance from "./pages/attendance/Attendance";
import Search from "./pages/search/Search";
import "./App.css";
import PrivateRoute from "./component/PrivateRoute";
import NotFound from "./pages/NotFound/NotFound";

function App()
{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
                <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />    
            </Routes>
        </Router>
    );
}
export default App;

