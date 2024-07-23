import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token  = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        console.log("Login successful");

        navigate("/");
      } else {
        const errorMessage =
          responseData.error || "Login failed. Please try again.";
        console.log(errorMessage);
        // alert("user not existed")
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
        <div className="form-footer">
          <a href="/" className="forgot-password">
            Forgot Password?
          </a>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
