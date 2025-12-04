import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(0);
  const [isListening, setIsListening] = useState(false);

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

      const getClothingRecommendation = (temp, weatherId, windSpeed) => {
        let recommendations = [];

        // Temperature
        if (temp < 10) {
          recommendations.push("Heavy Coat, Scarf, Gloves");
        } else if (temp < 20) {
          recommendations.push("Light Jacket or Sweater");
        } else {
          recommendations.push("T-shirt, Light Clothing");
        }

        // Rain/Snow (Weather IDs: 2xx, 3xx, 5xx, 6xx)
        if (weatherId >= 200 && weatherId < 600) {
          recommendations.push("Umbrella, Raincoat");
        } else if (weatherId >= 600 && weatherId < 700) {
          recommendations.push("Snow Boots, Warm Hat");
        }

        // Wind
        if (windSpeed > 20) {
          recommendations.push("Windbreaker");
        }

        // Sun (Clear sky day)
        if (data.weather[0].icon === '01d') {
          recommendations.push("Sunglasses");
        }

        return recommendations.join(" + ");
      };

      const getActivityRecommendation = (temp, weatherId, windSpeed) => {
        let activities = [];

        // Good Weather
        if (temp >= 15 && temp <= 25 && weatherId === 800 && windSpeed < 10) {
          activities.push("Running, Cycling, Picnic");
        }

        // Hot Weather
        if (temp > 25 && weatherId === 800) {
          activities.push("Swimming, Beach, Indoor Activities");
        }

        // Cold Weather
        if (temp < 5) {
          activities.push("Skiing, Ice Skating, Cozy Indoor Day");
        }

        // Rain/Snow
        if (weatherId >= 200 && weatherId < 700) {
          activities.push("Reading, Movies, Indoor Games");
        }

        // High Wind
        if (windSpeed > 20) {
          activities.push("Kite Flying (if clear), Avoid Cycling");
        }

        if (activities.length === 0) {
          activities.push("Enjoy your day!");
        }

        return activities.join(" | ");
      };

      const recommendation = getClothingRecommendation(data.main.temp, data.weather[0].id, data.wind.speed);
      const activity = getActivityRecommendation(data.main.temp, data.weather[0].id, data.wind.speed);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        recommendation: recommendation,
        activity: activity
      });

    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetchig weather data")
    };

  }
  useEffect(() => {
    search("London");
  }, [])

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = () => {
    if (isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice commands.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Voice Command:", command);
      setIsListening(false);

      if (command.includes("umbrella") || command.includes("rain")) {
        if (weatherData.recommendation.toLowerCase().includes("umbrella")) {
          speak("Yes, you should take an umbrella. It might rain.");
        } else {
          speak("No, you don't need an umbrella today.");
        }
      } else if (command.includes("coat") || command.includes("jacket") || command.includes("wear")) {
        speak(`I recommend wearing: ${weatherData.recommendation}`);
      } else if (command.includes("activity") || command.includes("do")) {
        speak(`You could go for: ${weatherData.activity}`);
      } else if (command.includes("weather") || command.includes("forecast")) {
        speak(`It is currently ${weatherData.temperature} degrees in ${weatherData.location}.`);
      } else {
        speak("I didn't catch that. Try asking about an umbrella, what to wear, or activities.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      speak("Sorry, I couldn't hear you.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData ? <>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>

        <div className="clothing-recommendation">
          <p>Recommended: {weatherData.recommendation}</p>
        </div>

        <div className="clothing-recommendation" style={{ marginTop: '10px' }}>
          <p>Activity: {weatherData.activity}</p>
        </div>

        <button
          className={`mic-button ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceCommand}
        >
          {isListening ? 'Listening...' : '🎤 Ask App'}
        </button>

        <div className="weather-data">
          <div className='col'>
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </> : <></>}


    </div>
  )
}

export default Weather