import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.less";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logouthandler = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">Blood Bank</div>

      <ul className="nav-links">

        {/*  NOT LOGGED IN */}
        {!user && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register-hospital">Register Hospital</Link></li>
            <li><Link to="/register-receiver">Register Receiver</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {/*  HOSPITAL */}
        {user?.role === "hospital" && (
          <>
            <li><Link to="/hospitaldashboard">Hospital Dashboard</Link></li>
            <li><Link to="/add-blood">Add Blood</Link></li>
            <li><Link to="/blood-samples">Blood Samples</Link></li>
            <li><Link to="/request-status">Request Status</Link></li>
            <li onClick={logouthandler} style={{ cursor: "pointer" }}>
              Logout
            </li>
          </>
        )}

        {/*  RECEIVER */}
        {user?.role === "receiver" && (
          <>
            <li><Link to="/receiverdashboard">Receiver Dashboard</Link></li>
            <li><Link to="/request-blood">Requests</Link></li>
            <li onClick={logouthandler} style={{ cursor: "pointer" }}>
              Logout
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;