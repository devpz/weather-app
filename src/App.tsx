import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "f7f4c056a7c349339d0155915242401";
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  useEffect(() => {
    if (weatherData) {
      updateBackground(weatherData.current.condition.text);
    }
  }, [weatherData]);

  const getWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: city,
        },
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (weatherCondition: string) => {
    const body = document.querySelector("body");

    if (body) {
      body.classList.remove("rain", "clouds", "sun");

      if (weatherCondition.toLowerCase().includes("rain")) {
        body.classList.add("rain");
      }
      if (weatherCondition.toLowerCase().includes("sun")) {
        body.classList.add("sun");
      } else if (weatherCondition.toLowerCase().includes("cloud")) {
        body.classList.add("clouds");
      }
      // TODO: Add more conditions for different weather types
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeatherData();
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={getWeatherData}>Check Weather</button>
      </div>
      {loading && <p>Loading...</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
