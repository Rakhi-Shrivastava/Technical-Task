
import React, { useState, useEffect, useContext } from 'react';
import DisplayData from "./DisplayData";
import WeatherContext from './Context/WeatherContext';

const WeatherForm = () => {
    const weatherContext = useContext(WeatherContext);
  
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [errors, setErrors] = useState({
      latitude: '',
      longitude: '',
    });
    const [weatherData, setWeatherData] = useState(null);
  
    const validateInput = (input, type) => {
      const regex = type === 'latitude' ? /^-?\d+(\.\d+)?$/ : /^-?\d+(\.\d+)?$/;
      const isValid = regex.test(input);
      setErrors({ ...errors, [type]: isValid ? '' : `Invalid ${type}` });
      return isValid;
    };
  
    const handleInputChange = (e, type) => {
      const value = e.target.value;
      if (type === 'latitude') {
        setLatitude(value);
        validateInput(value, 'latitude');
      } else if (type === 'longitude') {
        setLongitude(value);
        validateInput(value, 'longitude');
      }
    };
  
    const getCurrentLocation = () => {
        console.log(navigator.geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLatitude = position.coords.latitude.toFixed(6);
            const currentLongitude = position.coords.longitude.toFixed(6);
            setLatitude(currentLatitude);
            setLongitude(currentLongitude);
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };
  
    useEffect(() => {
      if (weatherContext.savedLatitude && weatherContext.savedLongitude) {
        setLatitude(weatherContext.savedLatitude);
        setLongitude(weatherContext.savedLongitude);
      }
    }, [weatherContext.savedLatitude, weatherContext.savedLongitude]);
  
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = '677fa8ef55msh12c799620d55df4p13296djsn3a8a9901fac2'; 
  
      try {
        const response = await fetch(
          `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
          }
        );
        const data = await response.json();
        console.log("data",data);
        if (response.ok) {
          console.log('Weather Data:', data);
          setWeatherData(data);
        } else {
          console.error('Error fetching data:', data.error.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const isLatitudeValid = validateInput(latitude, 'latitude');
      const isLongitudeValid = validateInput(longitude, 'longitude');
  
      if (isLatitudeValid && isLongitudeValid) {
        weatherContext.saveCoordinates(latitude, longitude);
        await fetchWeatherData(latitude, longitude);
      }
    };
  
    return (<>
      <div className="weather-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => handleInputChange(e, 'latitude')}
            className={errors.latitude ? 'error-input' : ''}
          />
          {errors.latitude && <div className="error-message">{errors.latitude}</div>}
  
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => handleInputChange(e, 'longitude')}
            className={errors.longitude ? 'error-input' : ''}
          />
          {errors.longitude && <div className="error-message">{errors.longitude}</div>}
  
          <button type="button" onClick={getCurrentLocation}>
            Get Current Location
          </button>
  
          <button style={{marginLeft:"100px"}} type="submit">Get Current Weather</button>
        </form>
      </div>
      {weatherData?<DisplayData weatherData={weatherData} />:null}
      </>
    );
  };
  
  export default WeatherForm;
