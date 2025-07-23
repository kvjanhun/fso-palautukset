import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const fetchAllCountries = () => {
    return axios.get(`${baseUrl}/all`)
        .then(response => response.data)
}

const fetchCountryInfo = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
        .then(response => response.data)
}

export default { fetchAllCountries, fetchCountryInfo }
