import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonTable from './components/PersonTable'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchValueChange = (event) => setNewSearchValue(event.target.value)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook,
        replace the old number with a new one?`))
        changeNumber(
          persons.find(person => person.name === newName).id,
          newNumber
        )
      return
    }
    phonebookService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearchValue.toLowerCase())
  )
  const personsToDisplay = newSearchValue ? filteredPersons : persons  
  
  const deletePerson = id => {
    if (window.confirm(`Delete ${findPersonById(id).name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Information of ${findPersonById(id).name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleClick = id => {
    deletePerson(id)
  }

  const findPersonById = id => {
    return persons.find(person => person.id === id)
  }

  const changeNumber = (id, newNumber) => {
    const personToUpdate = findPersonById(id)
    const updatedPerson = { ...personToUpdate, number: newNumber }

    phonebookService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={newSearchValue} onChange={handleSearchValueChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonTable persons={personsToDisplay} onClick={handleClick} />
    </>
  )
}

export default App