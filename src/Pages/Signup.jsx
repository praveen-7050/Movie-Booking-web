// Pages/SignUp.jsx
import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import "../assets/styles/signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    inpName: "",
    email: "",
    password: "",
    confirmpassowrd: "",
  });
  const navigate = useNavigate();
  const [Errors, setErrors] = useState({});
  
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = (password)=>/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  const handleinput = () => {
    let newErrors = {};
    if (!formData.inpName.trim()) {
      newErrors.inpName= "Name is required";
    }
    if(!formData.email){
      newErrors.email="Email is required"
    }else if (!isValidEmail(formData.email)){
      newErrors.email="Email format is invalid"
    }
    if(!formData.password){
      newErrors.password="Password is required"
    }else if (!passwordRegex(formData.password)){
      newErrors.password = "Password must include uppercase, lowercase, number & symbol";
    }
    if (!formData.confirmpassowrd) {
      newErrors.confirmpassowrd = "confirm password is required ";
    } else if (formData.confirmpassowrd !== formData.password) {
      newErrors.confirmpassowrd = "confirm password is mismatch";
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length===0
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleinput()){
     let localData= JSON.parse(localStorage.getItem("userdetailsformovie"))||[];
     if(!Array.isArray(localData)){
      localData= []
     }
     localData.push(formData)
      alert("Successfully Submited")
      localStorage.setItem("userdetailsformovie",JSON.stringify(localData));
       navigate("/login");
    }else{
      alert("please fix the Result")
    }
  };

  const handleChange = (e)=>{
    const {name,value}  = e.target;
    setFormData({...formData,[name]:value})

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Create Account</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="inpName" value={formData.inpName} onChange={handleChange} placeholder="Enter your name" />
            <span className="text-danger fw-semibold">{Errors.inpName}</span>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            <span className="text-danger fw-semibold">{Errors.email}</span>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
            <span className="text-danger fw-semibold">{Errors.password}</span>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmpassowrd" value={formData.confirmpassowrd} onChange={handleChange} placeholder="Confirm your password" />
            <span className="text-danger fw-semibold">{Errors.confirmpassowrd}</span>
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignUp;
