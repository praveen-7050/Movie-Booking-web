import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import movies from "../../../public/Data/movies.json";
import "../../assets/styles/Seats.css";

const totalSeats = 100;
const vipSeats = [45, 46, 47, 48, 49, 50, 55, 56, 57, 58, 59, 60, 65, 66, 67, 68, 69, 70, 75, 76, 77, 78, 79, 80, 85, 86, 87, 88, 89, 90, 95, 96, 97, 98, 99, 100];
const vipPrice = 250;
const normalPrice = 150;

const Seats = () => {
  const navigate = useNavigate();
  const { movieId, districtId, theatreName } = useParams();
  const location = useLocation();
  const { date, time } = location.state || {};

  const movieData = movies.find((m) => m.id == movieId);
  const movieName = movieData ? movieData.title : "Unknown Movie";

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (reservedSeats.includes(seat)) return;
    setSelectedSeats((prev) => (prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]));
  };

  const calculatePrice = () => {
    return selectedSeats.reduce((total, seat) => (vipSeats.includes(seat) ? total + vipPrice : total + normalPrice), 0);
  };

  const theatreNameFinal = theatreName || "Default Theatre";

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;

    navigate("/booking", {
      state: {
        movieId,
        districtId,
        theatreName: theatreNameFinal,
        seats: selectedSeats,
        total: calculatePrice(),
        date,
        time,
        movieName,
      },
    });
  };

  return (
    <div className="seats-page">
      <h2 className="title">Select Your Seats</h2>
      <p className="subtitle">
        {movieName} — {theatreNameFinal} — {date} @ {time}
      </p>

      <div className="screen-indicator">Screen Here</div>

      <div className="grid-box">
        {Array.from({ length: totalSeats }, (_, i) => {
          const seatNumber = i + 1;
          const isVIP = vipSeats.includes(seatNumber);
          const isReserved = reservedSeats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          let stateClass = "available";
          if (isReserved) stateClass = "reserved";
          else if (isSelected) stateClass = "selected";
          else if (isVIP) stateClass = "vip";

          return (
            <div key={seatNumber} className={`seat ${stateClass}`} onClick={() => toggleSeat(seatNumber)}>
              {seatNumber}
            </div>
          );
        })}
      </div>

      <div className="bottom-bar">
        <p>Available Seats: {totalSeats - reservedSeats.length - selectedSeats.length}</p>
        <p>Total: ₹{calculatePrice()}</p>

        <button onClick={handleProceed} disabled={selectedSeats.length === 0} className="proceed-btn">
          Proceed ({selectedSeats.length} Seats)
        </button>
      </div>
    </div>
  );
};

export default Seats;
