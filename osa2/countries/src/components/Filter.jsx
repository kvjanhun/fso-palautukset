import { useState } from 'react'

const Filter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    onFilterChange(value)
  }

  return (
    <div className="filter-container">
      <input
        id="country-filter"
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Find countries..."
        className="filter-input"
      />
    </div>
  )
}

export default Filter
