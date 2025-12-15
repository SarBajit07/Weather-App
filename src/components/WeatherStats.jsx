import React from 'react';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const WeatherStats = ({ humidity, windSpeed }) => {
    return (
        <div className="weather-data">
            <div className='col'>
                <img src={humidity_icon} alt="Humidity" />
                <div>
                    <p>{humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="Wind" />
                <div>
                    <p>{windSpeed} Km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;
