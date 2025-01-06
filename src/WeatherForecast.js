import React, { useState, useEffect } from "react";
import WeatherForecastPreview from "./WeatherForecastPreview";
import axios from "axios";
import "./WeatherForecast.css";

 export default function WeatherForecast(props) {
   const [loaded, setLoaded] = useState(false);
   const [forecast, setForecast] = useState(null);

   useEffect(() => {
     setLoaded(false);
   }, [props.coordinates]);

   function handleForecastResponse(response) {
     setForecast(response.data.daily);
     setLoaded(true);
   }

   if (loaded) {
     return (
       <div className="WeatherForecast row">
         {forecast.map(function (day, index) {
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
     let apiKey = "03b03be6a41bd339e2todfcdef02916a71b";
     let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;
     axios.get(apiUrl).then(handleForecastResponse);

     return null;
   }
 }