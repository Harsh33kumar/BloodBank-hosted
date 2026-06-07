import React, { useState } from "react";
import "../styles/register.less";

function RegisterHospital() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/backend_bb/hospitalReg.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      // const result = await response.json();
      const text = await response.text();


      const jsonStart = text.indexOf("{");
      const jsonText = text.substring(jsonStart);

      const result = JSON.parse(jsonText);

      alert(result.message);

      if (result.status) {
        setFormData({
          hospitalName: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error(error);
      // alert("Server Error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="form-title">Hospital Registration</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            className="form-control"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Hospital Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <input
            type="hidden"
            className="form-control"
            name="role"
            value="hospital"
          />

          <input
            type="text"
            name="address"
            placeholder="Hospital Address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />

          <button type="submit" className="register-btn">
            Register Hospital
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterHospital;
