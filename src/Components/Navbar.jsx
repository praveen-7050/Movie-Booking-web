import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/" style={{ color: "#ffffff" }}>
          <img src="../public/images/cine-logo.png" alt="Logo" className="img-fluid me-2" style={{ width: "35px", height: "35px", objectFit: "contain" }} />
          CineSpot
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Example NavLinks */}
            {/* <li className="nav-item me-3">
              <NavLink className="nav-link" to="/" style={({ isActive }) => ({
                color: "#fff",
                fontWeight: isActive ? "600" : "400",
                borderBottom: isActive ? "2px solid #ff6200" : "none",
              })}>
                Home
              </NavLink>
            </li> */}
          </ul>

          <ul className="navbar-nav ms-auto d-flex flex-column flex-lg-row gap-2 gap-lg-0">
            <li className="nav-item">
              <Link className="btn btn-outline-light w-100 w-lg-auto" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary w-100 w-lg-auto" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
