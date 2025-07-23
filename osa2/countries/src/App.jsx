import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService.fetchAllCountries()
      .then(data => setCountries(data))
  }, [])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div className="app">
      <h1>Data for countries</h1>
      <Filter onFilterChange={handleFilterChange} />
      <CountryList countries={countries} filter={filter} />
    </div>
  )
}

export default App
