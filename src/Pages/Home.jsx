import React, { useState, useEffect } from "react";
import "../assets/styles/home.css";
import movies from "../Data/Movies.json"
import { useNavigate } from "react-router-dom";

// Mock data (as provided in the prompt)
const offers = [
  { id: 1, title: "FLAT50", description: "Get ₹50 OFF on your first booking", tag: "Limited Time" },
  { id: 2, title: "10% Bank Offer", description: "Get 10% OFF with HDFC / ICICI Cards", tag: "Bank Deal" },
  { id: 3, title: "UPI Cashback", description: "Get ₹100 cashback on UPI payments", tag: "Cashback" },
];

const promoPosters = [
  { id: 1, image: "https://in.bmscdn.com/events/moviecard/ET00430817.jpg", title: "Jana Nayakan", description: "Blockbuster hits curated for you" },
  { id: 2, image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dude-et00445596-1759640703.jpg", title: "Dude", description: "Comedy drama thriller" },
  { id: 3, image: "https://in.bmscdn.com/events/moviecard/ET00395821.jpg", title: "Coolie", description: "Action drama for all" },
  { id: 4, image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/leo-et00351731-1675663884.jpg", title: "Leo", description: "High-octane action" },
  { id: 5, image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kiss-tamil-et00462731-1757918833.jpg", title: "Kiss", description: "Romantic entertainer" },
  { id: 6, image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00444587-epjpypslqp-portrait.jpg", title: "Thalavian Thalavi", description: "Musical drama" },
  { id: 7, image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kantara-a-legend-chapter-1-et00377351-1760336092.jpg", title: "Kantara", description: "Epic action adventure" },
];

const bannerImages = [
  "https://assets-in.bmscdn.com/discovery-catalog/events/et00430817-bmmentyrvc-landscape.jpg",
  "https://img.nowrunning.com/content/movie/2025/dude-31412/bg_dude.jpg", 
  "https://assets-in.bmscdn.com/discovery-catalog/events/et00377351-rbfendatzb-landscape.jpg", 
  "https://assets-in.bmscdn.com/discovery-catalog/events/et00395817-blyhwzrjhv-landscape.jpg", 
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [bannerImages.length]);


  const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
  const handleMovieClick = (m) => {
    navigate(`/movie/${m.id}`, { state: { movie: m } });
  };

  return (
    <div className="home-container py-4">
      <div className="container d-lg-flex justify-content-lg-center">
        <div className="search-wrapper shadow-sm p-3 rounded-pill d-flex align-items-center gap-2">
          <input type="text" className="form-control border-0 search-input" placeholder="Search movies, shows, events..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      <div className="banner-carousel-container mt-4">
        <div className="banner-carousel-inner">
          {bannerImages.map((image, index) => (
            <div key={index} className={`carousel-item ${index === currentBannerIndex ? "active" : ""}`}>
              <img src={image} className="d-block w-100 carousel-banner img-fluid" alt={`banner-${index}`} />
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {bannerImages.map((_, index) => (
            <button key={index} className={`indicator ${index === currentBannerIndex ? "active" : ""}`} onClick={() => setCurrentBannerIndex(index)}></button>
          ))}
        </div>
      </div>

      <h2 className="fw-bold mt-5">Recommended Movies</h2>
      <div className="recommend-scroll">
        {promoPosters.map((poster) => (
          <div key={poster.id} className="poster-card">
            <img src={poster.image} alt={poster.title} className="search-img" />
            <div className="poster-overlay">
              <h6>{poster.title}</h6>
              <p>{poster.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="fw-bold mt-5">Search Results</h2>
      <div className="cards-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((m) => (
            <div key={m.id} className="search-movie-card" onClick={() => handleMovieClick(m)}>
              <img src={m.poster} alt={m.title} className="search-img" />
              <div className="search-movie-card-content">
                <h5>{m.title}</h5>
                <p>{m.genre || "Genre info"}</p>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMovieClick(m);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found 😢</p>
        )}
      </div>

      <div className="offers-container mt-5">
        <h2 className="offers-title">Offers & Discounts</h2>
        <div className="cards-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <span className="offer-tag">{offer.tag}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
