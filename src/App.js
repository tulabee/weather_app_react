import React from "react";
import Weather from "./Weather";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Weather defaultCity ="San Francisco"/>
      </div>
    </div>
  );
}
