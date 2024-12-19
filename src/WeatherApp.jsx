import { useState } from "react";
import React from "react";
import WeatherIcon from "./assets/weather logo.webp";
import SkyImage from "./assets/sky-image.webp";

import "./App.css";

function WeatherApp() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleKeyDown = async (e) => {
    if (e.key == "Enter") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=8f071a7d5bf96dfd2d0d97b314c21acd`
        );
        const data = await response.json();
        console.log("Weather data:", data);
        console.log(`Temperature at:${e.target.value} is ${data.main.temp}`);
        setWeatherData(data);
      } catch (error) {
        console.log("ERROR DETECTED:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className=" text-xl">Weather App</div>
          <div className="weather-image">
            <img
              src={WeatherIcon}
              alt="Weather Icon"
              className="w-10 h-10 object-cover"
            />
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-twitter-blue"
            placeholder="Search location"
            value={searchInput}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="weather-card">
        <div
          className="max-w-3xl mx-auto rounded-xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${SkyImage})` }}
        >
          <div className="relative h-48 bg-gradient-to-br from-sky-200 to-sky-400 p-6">
            <div className="text-6xl font-light text-white">
              {" "}
              {weatherData ? `${weatherData.main.temp}°C` : "Search Your City"}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-white">
                {" "}
                {weatherData
                  ? `${weatherData.name},
                ${weatherData.sys.country}`
                  : ""}
              </div>
              <div className="text-white">
                {weatherData
                  ? `Feels like:${weatherData.main.feels_like}°C`
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
