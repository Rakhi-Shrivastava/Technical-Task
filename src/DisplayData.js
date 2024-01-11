
import React from 'react';
import './Form.css'

const Displaydata = ({ weatherData }) => {
  return(
    <div className="weather-display-container">
      {weatherData ? (
        <table className="weather-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Region</th>
              <th>Country</th>
              <th>Temperature (Celsius)</th>
              <th>Temperature (Fahrenheit)</th>
              <th>Humidity</th>
              <th>Wind Speed</th>
              <th>Feels Like (Celsius)</th>
              <th>Feels Like (Fahrenheit)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weatherData.location.name}</td>
              <td>{weatherData.location.region}</td>
              <td>{weatherData.location.country}</td>
              <td>{weatherData.current.temp_c}</td>
              <td>{weatherData.current.temp_f}</td>
              <td>{weatherData.current.humidity}</td>
              <td>{weatherData.current.wind_kph}</td>
              <td>{weatherData.current.feelslike_c}</td>
              <td>{weatherData.current.feelslike_f}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-data-message">No weather data available</p>
      )}
    </div>
  );
};

export default Displaydata;
