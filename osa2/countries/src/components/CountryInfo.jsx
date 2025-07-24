import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <div className="country-info">
      <div className="country-container">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} />
      </div>
      <div className="weather-container">
        <Weather city={country.capital} />
      </div>
    </div>
  )
}

export default CountryInfo