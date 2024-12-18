import { useState } from "react";
import React from "react";
import WeatherIcon from "./assets/weather logo.webp";

import "./App.css";

function WeatherApp() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async (city) => {
      if (e.target.value.length > 0) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8f071a7d5bf96dfd2d0d97b314c21acd`
          );
          const data = await response.json();

          const weatherInfo = {
            temperature: Math.round(data.main.temp),
            location: data.name,
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
          };
        } catch (error) {
          console.log("Error fetching suggestions");
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    }, 500);

    setTimer(newTimer);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=$8f071a7d5bf96dfd2d0d97b314c21acd`
      );
      const data = await response.json();

      setWeatherData({
        temperature: Math.round(data.main.temp),
        location: data.name,
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className=" text-xl">Weather APP</div>
          <div className="weather-image">
            <img
              src={WeatherIcon}
              alt="Weather Icon"
              className="w-12 h-12 object-cover"
            />
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-twitter-blue"
            placeholder="Search location"
            value={searchInput}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="weather-card">
        <div className="max-w-3xl mx-auto bg-twitter-blue rounded-xl overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-sky-200 to-sky-400 p-6">
            <div className="text-6xl font-light text-white">13°</div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-white">Pokhara, Nepal</div>
              <div className="text-white">7:00 PM, Thursday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
