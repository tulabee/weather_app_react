import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastPreview from "./WeatherForecastPreview"; // Ensure this component exists

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

useEffect(() => {
  setLoaded(false);
  if (props.coordinates) {
    search();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.coordinates]);


  function handleForecastResponse(response) {
    console.log(response.data); // Log the response to debug
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function search() {
    const apiKey = "03be6a41bd339e2todfcdef02916a71b";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleForecastResponse);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast row">
        {forecast.map((day, index) => {
          if (index < 5) {
            return (
              <div className="col" key={index}>
                <WeatherForecastPreview data={day} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    return null;
  }
}
