import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import MovieInfo from "./Components/Movies/MovieInfo";
import DistrictSelection from "./Components/Movies/DistrictSelection";
import Seats from "./Components/Movies/Seats";
import Booking from "./Pages/Booking";
import Payment from "./Components/Payment";
import Success from "./Components/Success";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup"
import Footers from "./Components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/district/:movieId" element={<DistrictSelection />} />
        <Route path="/seats/:movieId/:districtId/:theatreName" element={<Seats />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footers />
    </>
  );
};

export default App;
