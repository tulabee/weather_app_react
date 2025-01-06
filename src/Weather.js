import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  const search = useCallback(() => {
    const apiKey = "03be6a41bd339e2todfcdef02916a71b";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, [city]);

  useEffect(() => {
    search();
  }, [search]);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <a
          href="https://www.shecodes.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
      
        </a>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3 p-0">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          city={weatherData.city}
        />
        <footer>
          This project was coded by{" "}
          <a
            href="https://www.shecodes.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SheCodes
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/tulabee/weather_app_react"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://shecodes-weather.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    return "Loading...";
  }
}
