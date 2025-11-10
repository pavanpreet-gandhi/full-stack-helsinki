import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(
    // curly braces ensure the function below does not return the promise but simply calls it
    () => {peopleService.getAll().then(initialPeople => setPersons(initialPeople))},
    []
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (newPerson.name === '' || newPerson.number === '') {
      alert('Name or number cannot be empty')
    } else if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
        const updatedPerson = { ...personToUpdate, name: newPerson.name, number: newPerson.number }
        peopleService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            console.log('Old person', personToUpdate)
            console.log('Updated person', returnedPerson)
          })
          .then(() => {peopleService.getAll().then(updatedPeople => setPersons(updatedPeople))})
      }
    } else {
      peopleService
        .create(newPerson)
        .then(returnedPerson => console.log('Created person', returnedPerson))
        .then(() => {
          peopleService.getAll().then(updatedPeople => setPersons(updatedPeople))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) {
      return;
    }
    peopleService
      .deletePerson(id)
      .then(returnedPerson => console.log('Deleted person', returnedPerson))
      .then(() => {peopleService.getAll().then(updatedPeople => setPersons(updatedPeople))})
  }

  let filteredPersons = []
  if (filter === '') {
    filteredPersons = persons
  } else {
    console.log('Filter applied, showing persons matching:', filter)
    filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App