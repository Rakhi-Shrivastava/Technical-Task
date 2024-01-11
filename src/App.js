// App.js
import React from 'react';
import WeatherProvider from './Context/WeatherProvider';
import WeatherForm from './Form';
import './Form.css';

const App = () => {
  return (
    <WeatherProvider>
      <div className="app-container">
        <h1 style={{textAlign:"center"}}>Weather App</h1>
        <WeatherForm />
      </div>
    </WeatherProvider>
  );
};

export default App;
