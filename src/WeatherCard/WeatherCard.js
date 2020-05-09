import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import Axios from "axios";

function WeatherCard({ city }) {
 
    const [weatherData, setWeatherData] = useState({main: { temp: "", temp_max: "", temp_min: "", humidity: "" },weather: [{ main: "" }], });
    const [temperature, setTemperature] = useState(weatherData.main.temp);
    const [maxTemperature, setMaxTemperature] = useState(weatherData.main.temp_max);
    const [minTemperature, setMinTemperature] = useState(weatherData.main.temp_min);
    const [isCelsiusActive, setCelsiusStatus] = useState(false);
    const [isFahrenheitActive, setFahrenheitStatus] = useState(false);
    const [isKelvinActive, setKelvinStatus] = useState(true);
    const apiKey = 'bcc98771a9d310ebd603e73bb814a841';
    
    useEffect(() => {
        async function getData() {
            const response = await Axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
             );
            console.log(response.data);
            setWeatherData(response.data);
            if(isKelvinActive){
                setTemperature(response.data.main.temp);
                setMaxTemperature(response.data.main.temp_max);
                setMinTemperature(response.data.main.temp_min);
            }

            let temp = Number(response.data.main.temp);
            let maxTemp = Number(response.data.main.temp_max);
            let minTemp = Number(response.data.main.temp_min);
            
            if(isCelsiusActive) {
                temp = toCelsius(temp);
                maxTemp = toCelsius(maxTemp);
                minTemp = toCelsius(minTemp);
                setTemperature(temp);
                setMaxTemperature(maxTemp);
                setMinTemperature(minTemp);
            }
    
            if(isFahrenheitActive){
                temp = toFahrenheit(temp);
                maxTemp = toFahrenheit(maxTemp);
                minTemp = toFahrenheit(minTemp);
                setTemperature(temp);
                setMaxTemperature(maxTemp);
                setMinTemperature(minTemp);
            }
         }
        getData();   
    
    },[city]);

    
    let temp = Number(weatherData.main.temp);
    let maxTemp = Number(weatherData.main.temp_max);
    let minTemp = Number(weatherData.main.temp_min);  
    function clickHandler(event){
        let currentTempUnit = event.target.name;
            console.log(currentTempUnit);
        if (currentTempUnit === 'celsius'){
            temp = toCelsius(temp);
            maxTemp = toCelsius(maxTemp);
            minTemp = toCelsius(minTemp);
            setTemperature(temp);
            setMaxTemperature(maxTemp);
            setMinTemperature(minTemp);
            setFahrenheitStatus(false);
            setKelvinStatus(false);
            setCelsiusStatus(true);
            // console.log(temp);
        }
        else if(currentTempUnit === 'fahrenheit'){
            temp = toFahrenheit(temp);
            maxTemp = toFahrenheit(maxTemp);
            minTemp = toFahrenheit(minTemp);
            setTemperature(temp);
            setMaxTemperature(maxTemp);
            setMinTemperature(minTemp);
            setCelsiusStatus(false);
            setKelvinStatus(false);
            setFahrenheitStatus(true);
            // console.log(temp);
        }
        else {
            setTemperature(weatherData.main.temp);
            setMaxTemperature(weatherData.main.temp_max);
            setMinTemperature(weatherData.main.temp_min);
            setFahrenheitStatus(false);
            setCelsiusStatus(false);
            setKelvinStatus(true);
        }
  };

  function toCelsius(temp){
        return (temp - 273.15).toFixed(1);
  };

  function toFahrenheit(temp){
        return (((temp - 273.15)*1.8)+32).toFixed(1);
  };

  const displaySymbol = (<>
        {isCelsiusActive ? <span> &deg;C</span> : null}
        {isFahrenheitActive ? <span> &deg;F</span> : null}
        {isKelvinActive ? <span> K</span>: null}
        </>
  );

  return (
    <div className="container">
      <div className="city-name">{city}</div>
      <div className="temperature">{temperature}{displaySymbol}</div>
      <div className="weather">{weatherData.weather[0].main}</div>
      <div className="max-min">
      <span>Max : <span className='max'> {maxTemperature}{displaySymbol}</span></span>
      <span>Min : <span className='min'> {minTemperature}{displaySymbol}</span></span>
      </div>
      <div className="temperature-unit">
        view in : <button name='kelvin'onClick={(event)=>clickHandler(event)}>K</button> 
                  <button name='fahrenheit'onClick={(event)=>clickHandler(event)}>&deg;F</button> 
                  <button name='celsius'onClick={(event)=>clickHandler(event)}> &deg;C</button>  
      </div>
    </div>
  );
}

export default WeatherCard;
