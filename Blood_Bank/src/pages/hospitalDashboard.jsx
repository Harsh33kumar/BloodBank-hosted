import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/hospitalDashboard.less";

function HospitalDashboard() {
  const [authorized, setAuthorized] = useState(null);
  const [hospitalName, setHospitalName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setAuthorized(false);
      return;
    }

    if (user.role !== "hospital") {
      setAuthorized(false);
      return;
    }

    setHospitalName(user.hospitalName || user.name || "Hospital");
    setAuthorized(true);
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="hospital-dashboard">
      <div className="dashboard-header">
        <h1>Hospital Dashboard</h1>
        <p>Welcome, {hospitalName}</p>
      </div>

      <div className="dashboard-cards">
        <Link to="/add-blood" className="dashboard-card">
          <h2>Add Blood Sample</h2>
          <p>Add new blood units to inventory.</p>
        </Link>

        <Link to="/blood-samples" className="dashboard-card">
          <h2>My Blood Samples</h2>
          <p>View and manage all blood samples.</p>
        </Link>

        <Link to="/view-requests" className="dashboard-card">
          <h2>Blood Requests</h2>
          <p>View receiver requests and respond.</p>
        </Link>
      </div>
    </div>
  );
}

export default HospitalDashboard;