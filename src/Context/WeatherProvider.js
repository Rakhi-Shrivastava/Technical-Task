import React, { useState, useEffect } from 'react';
import WeatherContext from './WeatherContext';

const WeatherProvider = ({ children }) => {
  const [savedLatitude, setSavedLatitude] = useState('');
  const [savedLongitude, setSavedLongitude] = useState('');

  useEffect(() => {
    const storedLatitude = localStorage.getItem('latitude');
    const storedLongitude = localStorage.getItem('longitude');

    if (storedLatitude && storedLongitude) {
      setSavedLatitude(storedLatitude);
      setSavedLongitude(storedLongitude);
    }
  }, []);

  const saveCoordinates = (latitude, longitude) => {
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    setSavedLatitude(latitude);
    setSavedLongitude(longitude);
  };

  return (
    <WeatherContext.Provider value={{ savedLatitude, savedLongitude, saveCoordinates }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
