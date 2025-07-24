import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const fetchWeather = (city) => {
  return axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
}

export default { fetchWeather }
