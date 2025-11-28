import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../assets/styles/Success.css";

const Success = () => {
  const bookingId = localStorage.getItem("bookingId");
  const movieName = localStorage.getItem("movieName");
  const seats = JSON.parse(localStorage.getItem("seats") || "[]");
  const amount = localStorage.getItem("amount");
  const theater = localStorage.getItem("theater");

  return (
    <div className="success-page">
      <div className="success-card">
        <h1 className="success-title">Booking Confirmed 🎉</h1>
        <p>
          <strong>Booking ID:</strong> {bookingId}
        </p>
        <p>
          <strong>Movie:</strong> {movieName}
        </p>
        <p>
          <strong>Theater:</strong> {theater}
        </p>
        <p>
          <strong>Seats:</strong> {seats.join(", ")}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{amount}
        </p>
        <div className="qr-wrapper">
          <QRCodeCanvas value={`Booking ID: ${bookingId}\nMovie: ${movieName}\nTheater: ${theater}\nSeats: ${seats.join(", ")}\nAmount: ₹${amount}`} size={180} />
        </div>
        <button className="home-btn" onClick={() => (window.location.href = "/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
