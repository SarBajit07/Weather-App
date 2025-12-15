import React, { useEffect, useRef, useState } from 'react'
import { getWeatherBriefing } from '../services/aiService'
import { initializeVectorStore } from '../services/vectorService'
import { addToHistory, getHistory, clearHistory } from '../services/historyService'
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

// Sub-components
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import AiInsights from './AiInsights'
import WeatherStats from './WeatherStats'
import HistoryPanel from './HistoryPanel'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const loadHistory = () => {
    setHistoryData(getHistory());
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistoryData([]);
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter the City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      // Initial state with basic data while AI loads
      const basicData = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: icon,
        recommendation: "Consulting AI...",
        activity: "Thinking..."
      };

      setWeatherData(basicData);

      // Call AI for dynamic briefing
      getWeatherBriefing(basicData).then(briefing => {
        setWeatherData(prev => ({
          ...prev,
          recommendation: briefing.recommendation,
          activity: briefing.activity,
          reasoning: briefing.reasoning,
          safetyTips: briefing.safetyTips
        }));

        // Save to History
        addToHistory(basicData.location, basicData.temperature, briefing.recommendation);
      });

    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching weather data")
    };

  }

  useEffect(() => {
    initializeVectorStore(); // Init RAG
    search("London");
  }, [])

  return (
    <div className='weather'>
      {/* History Toggle Button */}
      <button
        className="history-toggle"
        onClick={() => { setShowHistory(true); loadHistory(); }}
      >
        🕒
      </button>

      {/* History Panel Overlay */}
      {showHistory && (
        <HistoryPanel
          history={historyData}
          onClose={() => setShowHistory(false)}
          onClear={handleClearHistory}
        />
      )}

      <SearchBar inputRef={inputRef} onSearch={search} />

      {weatherData ? <>
        <CurrentWeather weatherData={weatherData} />

        <AiInsights
          recommendation={weatherData.recommendation}
          activity={weatherData.activity}
          reasoning={weatherData.reasoning}
          safetyTips={weatherData.safetyTips}
        />

        <WeatherStats
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
        />
      </> : <></>}
    </div>
  )
}

export default Weather