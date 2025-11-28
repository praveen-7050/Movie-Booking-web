import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return <h2>Missing Booking Details</h2>;

  const { theatreName, seats, total, date, time, movieName } = state;

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        theatreName,
        seats,
        total,
        date,
        time,
        movieName,
      },
    });
  };

  return (
    <div className="booking-page">
      <h2>Booking Summary</h2>

      <div className="summary-card">
        <p>
          <span>Movie:</span> <span>{movieName}</span>
        </p>
        <p>
          <span>Theatre:</span> <span>{theatreName}</span>
        </p>
        <p>
          <span>Seats:</span> <span>{seats.join(", ")}</span>
        </p>
        <p>
          <span>Date:</span> <span>{date}</span>
        </p>
        <p>
          <span>Time:</span> <span>{time}</span>
        </p>
        <p className="total-amount">
          <span>Total:</span> <span>₹{total}</span>
        </p>
      </div>
      <div className="">
        <button className="btn-pay" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Booking;
