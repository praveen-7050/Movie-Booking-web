import React from "react";
import  "../assets/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div>
          <h4>About</h4>
          <p>Learn more about our platform and mission.</p>
        </div>
        <div>
          <h4>Help / Support</h4>
          <p>FAQs, Ticket Booking Support, Contact us anytime.</p>
        </div>
        <div>
          <h4>Terms / Privacy</h4>
          <p>Read our terms of service and privacy policy.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: support@example.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>
      <div className="footer-socials">
        <a href="#">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
      <p className="footer-copy">© 2025 MovieSite. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
