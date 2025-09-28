import React, { useState } from "react";
import './App.css';

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [condition, setCondition] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Base_URL = "https://api.weatherapi.com/v1/current.json";
  const API_Key = "8505d093367542309be160107252709";

  const getWeatherReport = () => {
    if (!searchVal) return;

    setIsLoading(true);
    setIsApiLoaded(false);

    fetch(`${Base_URL}?key=${API_Key}&q=${searchVal}&aqi=no`)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert("Failed to fetch weather data");
          setIsApiLoaded(false);
          return;
        }
        setTemp(result.current.temp_c);
        setHumidity(result.current.humidity);
        setCondition(result.current.condition.text);
        setWindSpeed(result.current.wind_kph);
        setIsApiLoaded(true);
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        alert("Failed to fetch weather data");
        setIsApiLoaded(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Weather App</h1>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter City and Search"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="btn" onClick={getWeatherReport}>
          Search
        </button>

        <div>
          {isLoading ? (
            <p>Loading data...</p>
          ) : isApiLoaded ? (
            <>
              {/* parent container with .weather-cards */}
              <div
                className="weather-cards"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <div className="weather-card">
                  <h5>Temperature</h5>
                  <span>{temp}</span>
                </div>
                <div className="weather-card">
                  <h5>Humidity</h5>
                  <span>{humidity}</span>
                </div>
                <div className="weather-card">
                  <h5>Condition</h5>
                  <span>{condition}</span>
                </div>
                <div className="weather-card">
                  <h5>Wind speed</h5>
                  <span>{windSpeed}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
