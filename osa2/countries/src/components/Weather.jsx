import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (city) {
      weatherService.fetchWeather(city)
        .then(data => {
          setWeather(data)
        })
        .catch(error => {
          console.error("Error fetching weather data:", error)
          setWeather(null)
        })
    }
  }, [city])

  if (!weather) {
    return <div>No idea. Hope it's good!</div>
  }

  const weatherIcon = weather.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  return (
    <div className="weather">
      <h3>Weather in {city}</h3>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
