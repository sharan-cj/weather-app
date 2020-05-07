import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import Axios from "axios";

function App() {
  const [cities, setCity] = useState({ loading:'' });
  const [activeCity, setActiveCity ] = useState('');
  useEffect(() => {
    async function getCities() {
      const result = await Axios(
        "https://weather-app-f99b3.firebaseio.com/.json?auth=5IQ99oUxwNsgp5jzLlLPlJTuTrqV94FL8viwcTkY"
      );
      setCity(result.data);
    }
    getCities();
  });
  // console.log(cities);

  
  function clickHandler(city){
    setActiveCity(city);
    console.log(activeCity);
  }
  
  return (
    <div className="App">
      <div className="header">
        <h3>The Weather App</h3>
        <div className="city">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select a City
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {Object.keys(cities).map((city) => {
                return (
                  <a className="dropdown-item" onClick={()=>clickHandler(city)} key={city} href='#'>
                    {city}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {activeCity ? <WeatherCard city={activeCity}/> : null}
      
    </div>
  );
}

export default App;
