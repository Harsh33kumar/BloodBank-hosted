import React from "react";
import axios from "axios";
import "../styles/login.less";

function Login() {

  const host = "http://localhost/backend_bb";

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");
    try {
      const response = await axios.post(
        `${host}/login.php`,
        {
          username,
          password,
          role
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // console.log(response.data);

      if (response.data.status) {
        alert("Login Successful");

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );


        // redirect
        // window.location.href = "/dashboard";
        window.location.href = `/${response.data.user.role}dashboard`;

      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="form-title">Blood Bank Login</h1>

        <form onSubmit={handleLogin} className="login-form">

          <input
            type="text"
            name="username"
            placeholder="Email"
            className="form-control"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            required
          />

          <select
            name="role"
            className="form-control"
            required
          >
            <option value="hospital">Hospital</option>
            <option value="receiver">Receiver</option>
          </select>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
          <a href="/register-hospital">Hospital Register</a>
          <br />
          <a href="/register-receiver">Receiver Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;