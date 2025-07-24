const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <div className="country-list">
      {countries.map(country => (
        <div key={country.cca3} className="country-item">
          <h3>
            <img 
              src={country.flags.png}
              className="list-flag" />
            {country.name.common}
          </h3>
          <button className="select-button" onClick={() => onCountrySelect(country)}>
            Select
          </button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
