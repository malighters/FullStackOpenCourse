import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    if (persons.find(person => (person.name === newName && person.number === newNumber))){
      alert(`${newName} is already exists in the phonebook`)
      console.log({newName})
      
    }
    else if (persons.find(person => person.name === newName)){
      const person = persons.find(person => person.name === newName)
      const id = person.id
      const changedPerson = {...person, number: newNumber}
      const responce = window.confirm(`${newName} is already added in the phonebook, replace the old number with a new one?`)
      if(responce){
        personsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(`Updated number for ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            alert(
              `There is an error. Can't find ${person.name} number on the server`
            )
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personsService
        .create(personObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    const responce = window.confirm(`Delete ${person.name}?`)
    if(responce){
      personsService.deleteObject(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          console.error('There was an error!', error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
      })
    }

  } 

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])


  const personsToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handlePhoneChange} />
      <h3>Numbers</h3>
      <Persons persons = {personsToShow} deletePerson = {deletePerson}/>
      </div>
  )
}

export default App