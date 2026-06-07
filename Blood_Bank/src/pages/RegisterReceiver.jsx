import React, { useState } from "react";
import "../styles/register.less";

function RegisterReceiver() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    contact: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/backend_bb/receiverReg.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const text = await response.text();

      const jsonStart = text.indexOf("{");

      if (jsonStart === -1) {
        throw new Error("Invalid JSON response from server");
      }

      const result = JSON.parse(text.substring(jsonStart));

      alert(result.message);

      if (result.status) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          contact: "",
          bloodGroup: "",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="receiver-page">
      <div className="receiver-card">
        <h1 className="form-title">Receiver Registration</h1>

        <form className="receiver-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            className="form-control"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <select
            className="form-control blood-group-select"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button type="submit" className="register-btn">
            Register
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterReceiver;