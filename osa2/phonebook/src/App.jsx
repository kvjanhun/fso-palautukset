import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1' },
    { name: 'Ada Lovelace', id: '2' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const displayPersons = () => {
    return persons.map((person) => (
      <tr key={person.id}>
        <td>{person.name}</td>
      </tr>
    ))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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