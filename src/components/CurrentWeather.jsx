import React from 'react';

const CurrentWeather = ({ weatherData }) => {
    return (
        <div className="weather-content">
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
        </div>
    );
};

export default CurrentWeather;
