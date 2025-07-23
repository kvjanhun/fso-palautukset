import CountryInfo from "./CountryInfo"

const CountryList = ({ countries, filter }) => {
  if (!countries || countries.length === 0) {
    return <div className="message">No countries to display</div>
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  if (filter && filteredCountries.length === 0) {
    return <div className="message">No countries match your search</div>
  }

  if (filteredCountries.length > 10) {
    return (
      <div className="message">
        Too many matches ({filteredCountries.length}), specify another filter
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />
  }

  return (
    <div className="country-list">
      {filteredCountries.map(country => (
        <div key={country.cca3} className="country-item">
          <h3>
            <img 
              src={country.flags.png}
              className="list-flag" />
            {country.name.common}
          </h3>
          {/* You can add more country details here later */}
        </div>
      ))}
    </div>
  )
}

export default CountryList
