import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService.fetchAllCountries()
      .then(data => setCountries(data))
  }, [])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setSelectedCountry(null)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  
  const displayCountry = filteredCountries.length === 1 ? filteredCountries[0] : selectedCountry

  return (
    <div className="app">
      <h1>Data for countries</h1>
      <div className="content">
        <div className="left-column">
          <Filter onFilterChange={handleFilterChange} />
          {!countries || countries.length === 0 ? (
            <div className="message">No countries to display</div>
          ) : filter && filteredCountries.length === 0 ? (
            <div className="message">No countries match your search</div>
          ) : filteredCountries.length > 214 ? (
            <div className="message">
              Start by typing a country name.
            </div>
          ) : filteredCountries.length > 10 ? (
            <div className="message">
              Too many matches ({filteredCountries.length}), specify another filter
            </div>
          ) : (
            <CountryList 
              countries={filteredCountries} 
              onCountrySelect={handleCountrySelect}
            />
          )}
        </div>
        <div className="right-column">
          {displayCountry ? (
            <CountryInfo country={displayCountry} />
          ) : (
            <div className="message">
              Select a country to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
