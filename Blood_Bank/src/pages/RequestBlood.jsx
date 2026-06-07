import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/RequestBlood.less";

function RequestBlood() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log("User from localStorage:", user);

  const receiverId = user.id || "";
  const receiverName = user.username || "";
  const email = user.email || "";
  const contact = user.contact || "";
  const address = user.address || "";
  const receiverBloodGroup = user.blood_group || "";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    receiverId,
    receiverName,
    email,
    contact,
    address,
    receiverBloodGroup,
    quantity: "",
    hospitalName: location.state?.hospitalName || "",
    bloodGroup: location.state?.bloodGroup || "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      quantity: e.target.value,
    });
  };

  const submitRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    // console.log("form data:", formData);
    try {
      const response = await axios.post(
        "http://localhost/backend_bb/requestBlood.php",
        formData,
      );

      if (response.data.status) {
        alert("Blood Request Submitted Successfully");

        setFormData({
          receiverId,
          receiverName,
          email,
          contact,
          address,
          receiverBloodGroup,
          quantity: "",
          hospitalName: location.state?.hospitalName || "",
          bloodGroup: location.state?.bloodGroup || "",
          status: "Pending",
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="request-container">
      <div className="request-card">
        <h2>Blood Request Form</h2>

        <div className="info-card">
          <div>
            <span>Hospital</span>
            <h4>{formData.hospitalName}</h4>
          </div>

          <div className="blood-badge">{formData.bloodGroup}</div>
        </div>

        <form onSubmit={submitRequest}>
          <div className="form-group">
            <label>Receiver Name</label>
            <input type="text" value={receiverName} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} readOnly />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input type="text" value={contact} readOnly />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" value={address} readOnly />
          </div>

          <div className="form-group">
            <label>Your Blood Group</label>
            <input type="text" value={receiverBloodGroup} readOnly />
          </div>

          <div className="form-group">
            <label>Required Units</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="status-box">
            Status: <span>Pending</span>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Request Blood"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestBlood;
