import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonTable from './components/PersonTable'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [notificationType, setNotificationType] = useState('empty')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
        setNotificationType('success')
        setNotificationMessage(`Added ${returnedNote.name}`)
        setTimeout(() => {
          setNotificationType('empty')
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearchValue.toLowerCase())
  )
  const personsToDisplay = newSearchValue ? filteredPersons : persons  
  
  const deletePerson = id => {
    const personName = findPersonById(id).name
    if (window.confirm(`Delete ${personName}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationType('success')
          setNotificationMessage(`Deleted ${personName}`)
          setTimeout(() => {
            setNotificationType('empty')
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationType('error')
          setNotificationMessage(`Information of ${personName} has already been removed from server`)
          setTimeout(() => {
            setNotificationType('empty')
            setNotificationMessage(null)
          }, 5000)
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
        setNotificationType('success')
        setNotificationMessage(`Updated ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationType('empty')
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(() => {
        setNotificationType('error')
        setNotificationMessage(`Information of ${personToUpdate.name} has already been removed from server`)
        setTimeout(() => {
          setNotificationType('empty')
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const divStyle = {
    padding: '10px',
    fontFamily: 'sans-serif'
  }

  return (
    <div style={divStyle}>
      <h1 style={{ margin: '0' }}>Phonebook</h1>
      <Notification message={notificationMessage} notificationType={notificationType} />
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
    </div>
  )
}

export default App