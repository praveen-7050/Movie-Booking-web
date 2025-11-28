import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/DistrictSelection.css";

const districts = [
  { id: 1, name: "Chennai", theaters: ["SPI Cinema", "PVR", "Escape"] },
  { id: 2, name: "Tiruppur", theaters: ["SriSakthi Cinemas", "Siva Cinemas", "Ganesh Theater", "Varanashi Theater", "Sakthi"] },
  { id: 3, name: "Coimbatore", theaters: ["Broadway Cinemas", "PVR", "INOX", "KG Cinemas", "Maharaja Multiplex"] },
];

const showTimings = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

const formatDate = (date) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

const getNextThreeDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    dates.push({ date: dateString, label: i === 0 ? "Today" : formatDate(date) });
  }
  return dates;
};

const DistrictSelection = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleProceed = () => {
    if (selectedDistrict && selectedTheater && selectedDate && selectedTime) {
      navigate(`/seats/${movieId}/${selectedDistrict.id}/${selectedTheater}`, {
        state: { date: selectedDate, time: selectedTime },
      });
    } else {
      setShowModal(true);
    }
  };

  const nextThreeDates = getNextThreeDates();

  return (
    <div className="district-container py-5">
      <h2 className="text-center text-primary-heading mb-4">Select Your District & Theater</h2>

      <div className="select-wrapper container">
        <div className="district-selection mb-4">
          <label className="form-label fw-bold">District</label>
          <select
            className="form-select custom-select"
            value={selectedDistrict?.id || ""}
            onChange={(e) => {
              const district = districts.find((d) => d.id === Number(e.target.value));
              setSelectedDistrict(district);
              setSelectedTheater("");
              setSelectedDate("");
              setSelectedTime("");
            }}
          >
            <option value="">-- Select District --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="theater-selection mb-4">
          <label className="form-label fw-bold">Theater</label>
          <select
            className="form-select custom-select"
            value={selectedTheater}
            onChange={(e) => {
              setSelectedTheater(e.target.value);
              setSelectedDate("");
              setSelectedTime("");
            }}
            disabled={!selectedDistrict}
          >
            <option value="">-- Select Theater --</option>
            {selectedDistrict?.theaters.map((theater, idx) => (
              <option key={idx} value={theater}>
                {theater}
              </option>
            ))}
          </select>
        </div>

        <div className="date-selection mb-4">
          <label className="form-label fw-bold">Date</label>
          <div className="date-scroll-container">
            {nextThreeDates.map((dateObj) => (
              <button key={dateObj.date} className={`date-pill ${dateObj.date === selectedDate ? "active" : ""}`} onClick={() => setSelectedDate(dateObj.date)} disabled={!selectedTheater}>
                {dateObj.label}
              </button>
            ))}
          </div>
        </div>

        <div className="time-selection mb-4">
          <label className="form-label fw-bold">Show Timing</label>
          <select className="form-select custom-select" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} disabled={!selectedDate}>
            <option value="">-- Select Show Timing --</option>
            {showTimings.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary btn-proceed px-5 py-2" onClick={handleProceed}>
            Proceed
          </button>
        </div>

        {showModal && (
          <div className="custom-modal-backdrop">
            <div className="custom-modal">
              <h5 className="modal-title">Missing Information</h5>
              <p className="modal-body-text">Please select District, Theater, Date, and Show Timing.</p>
              <button className="btn btn-primary modal-close-btn" onClick={() => setShowModal(false)}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictSelection;
