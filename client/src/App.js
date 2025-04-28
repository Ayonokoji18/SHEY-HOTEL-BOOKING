import React from "react";
import Navbar from "../src/components/Navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Homescreen.js";
import BookingScreen from "./screens/Bookingscreen.js";
import Register from "./screens/Register.js";
import Loginscreen from "./screens/Loginscreen.js";
import Landingscreen from "./screens/Landingscreen.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/" element={<Landingscreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            element={<BookingScreen />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
