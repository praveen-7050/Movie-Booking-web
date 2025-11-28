// Pages/MovieInfo.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../../data/Movies.json";
import "../../assets/styles/MovieInfo.css";

const MovieInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id === Number(id));
    setMovie(selectedMovie);
  }, [id]);

  if (!movie) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading Movie Info...</h2>
      </div>
    );
  }

  // Handle Booking Click
  const handleBooking = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      navigate(`/district/${movie.id}`);
    } else {
      alert("You must be logged in to book tickets!");
      navigate("/login");
    }
  };

  return (
    <div className="movie-info-container">
      <div className="movie-banner">
        <img src={movie.banner} alt={movie.title} className="movie-banner-img" />
        <div className="movie-banner-overlay"></div>
        <div className="movie-banner-content">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-genre">{movie.genre || "Genre info unavailable"}</p>
          <p className="movie-details">
            {movie.language || "Unknown"} • {movie.duration || "N/A"}
          </p>
        </div>
      </div>

      <div className="movie-info-section container">
        <div className="row">
          <div className="col-lg-8 col-md-8 my-5">
            <h2 className="section-heading">About the Movie</h2>
            <p className="movie-description">{movie.description || "Description not available."}</p>

            <h3 className="section-heading mt-4">Lead Cast</h3>
            <ul className="movie-cast-list">{movie.cast?.lead?.map((actor, index) => <li key={index}>{actor}</li>) || <li>Information unavailable</li>}</ul>

            <h3 className="section-heading mt-4">Supporting Cast</h3>
            <ul className="movie-cast-list">{movie.cast?.supporting?.map((actor, index) => <li key={index}>{actor}</li>) || <li>Information unavailable</li>}</ul>

            <h3 className="section-heading mt-4">Crew</h3>
            <ul className="movie-cast-list">
              {movie.crew ? (
                Object.entries(movie.crew).map(([role, name], index) => (
                  <li key={index}>
                    <strong>{role.charAt(0).toUpperCase() + role.slice(1)}:</strong> {Array.isArray(name) ? name.join(", ") : name}
                  </li>
                ))
              ) : (
                <li>Information unavailable</li>
              )}
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <div className="booking-card shadow">
              <h3 className="fw-bold">{movie.title}</h3>
              <p className="booking-desc">Ready to book your movie experience?</p>
              <button className="btn btn-danger w-100 mt-3" onClick={handleBooking}>
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
