import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '0401234567' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
    { id: 5, name: 'John Doe', number: '123-456-7890' },
    { id: 6, name: 'Jane Smith', number: '987-654-3210' },
    { id: 7, name: 'Alice Johnson', number: '555-1234' },
    { id: 8, name: 'Bob Brown', number: '555-5678' },
    { id: 9, name: 'Charlie White', number: '555-8765' },
    { id: 10, name: 'Diana Prince', number: '555-4321' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchValueChange = (event) => {
    setNewSearchValue(event.target.value)
  }

  const displayPersons = () => {
    if (personsToDisplay.length === 0) {
      return <tr><td colSpan="2">No results found</td></tr>
    }
    return personsToDisplay.map((person) => (
      <tr key={person.id}>
        <td>{person.name}</td>
        <td>{person.number}</td>
      </tr>
    ))
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearchValue.toLowerCase())
  )

  const personsToDisplay = newSearchValue ? filteredPersons : persons  
  
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with
        <input
          value={newSearchValue}
          onChange={handleSearchValueChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {displayPersons()}
        </tbody>
      </table>
    </div>
  )
}

export default App