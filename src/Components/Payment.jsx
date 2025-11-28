import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { theatreName, seats, total, date, time, movieName } = state || {};

  const [method, setMethod] = useState("");

  if (!state) return <h2>Payment Details Missing</h2>;

  const handlePay = () => {
    if (!method) {
      alert("Select a payment method");
      return;
    }

    localStorage.setItem("movieName", movieName);
    localStorage.setItem("theater", theatreName);
    localStorage.setItem("amount", total);
    localStorage.setItem("seats", JSON.stringify(seats));
    localStorage.setItem("bookingId", Math.floor(100000 + Math.random() * 900000));

    navigate("/success", {
      state: { theatreName, seats, total, date, time, paymentMethod: method, movieName },
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Payment</h2>
        <p>
          <strong>Movie:</strong> {movieName}
        </p>
        <p>
          <strong>Theatre:</strong> {theatreName}
        </p>
        <p>
          <strong>Seats:</strong> {seats.join(", ")}
        </p>
        <p>
          <strong>Total:</strong> ₹{total}
        </p>

        <h3>Select Payment Method</h3>

        <div className="method-list">
          <label className={method === "UPI" ? "active" : ""}>
            <input type="radio" name="payment" value="UPI" onChange={(e) => setMethod(e.target.value)} />
            UPI
          </label>
          <label className={method === "Card" ? "active" : ""}>
            <input type="radio" name="payment" value="Card" onChange={(e) => setMethod(e.target.value)} />
            Card
          </label>
          <label className={method === "Net Banking" ? "active" : ""}>
            <input type="radio" name="payment" value="Net Banking" onChange={(e) => setMethod(e.target.value)} />
            Net Banking
          </label>
          <label className={method === "Wallet" ? "active" : ""}>
            <input type="radio" name="payment" value="Wallet" onChange={(e) => setMethod(e.target.value)} />
            Wallet
          </label>
        </div>

        <button className="pay-btn" onClick={handlePay}>
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
};

export default Payment;
