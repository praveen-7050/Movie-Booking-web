// Pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) setLoggedInUser(user);
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    let users = JSON.parse(localStorage.getItem("userdetailsformovie")) || [];
    if (!Array.isArray(users)) users = [];

    const userFound = users.find((u) => u.email === formData.email && u.password === formData.password);

    if (!userFound) {
      setErrors({ general: "Invalid email or password!" });
      return;
    }

    // Login success
    localStorage.setItem("loggedInUser", JSON.stringify(userFound));
    setLoggedInUser(userFound);

    navigate("/"); // redirect to home
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!loggedInUser ? (
          <>
            <h2 className="login-title">Welcome Back</h2>
            {errors.general && <p className="error-text">{errors.general}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={errors.email ? "is-invalid" : ""} />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className={errors.password ? "is-invalid" : ""} />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            <p className="signup-text">
              New here? <Link to="/signup">Create Account</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Welcome, {loggedInUser.name}!</h2>
            <p>Email: {loggedInUser.email}</p>
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
