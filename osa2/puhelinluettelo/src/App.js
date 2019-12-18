import React, { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import FilterForm from './components/FilterForm'
import Notification from './components/Message'
import axios from 'axios'
import nameService from './services/names'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])



const addName = (event) => {
  event.preventDefault()
  if (persons.find(({name}) => name === newName)===undefined) {
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    nameService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        console.log(returnedName.name)
        setNewMessage(
          `Name '${returnedName.name}' was succesfully added to server`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(
          `Failed cause: '${error}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  } else {
    if (window.confirm(`Are you sure you want to update number of ${newName}?`)){
      const x = (persons.find(({name}) => name === newName)).id
      const url = `http://localhost:3001/persons/${x}`
      const name = persons.find(n => n.id === x)
      const changedName = { ...name, number: newNumber }

      axios.put(url, changedName)
        .then(response => {
          console.log(response.data)
          setPersons(persons.map(note => note.id !== x ? note : response.data))
          setNewMessage(
            `Number of '${response.data.name}' was succesfully updated to server`
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        .catch(error => {
        console.log('fail')
        setErrorMessage(
          `Number of '${changedName}' was not on server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        })
    }
  }
}

const handleDeleteClick = (person) => {
  if (window.confirm("Are you sure you want to delete?")){
  nameService
    .deleteName(person)
    .then(returnedPerson => {
      console.log(returnedPerson)
      setPersons(persons.filter(name => name.id !== returnedPerson.id))
      setNewMessage(
        `Name '${returnedPerson.name}' was succesfully removed from server`
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log('fail')
      setErrorMessage(
        `Name '${person.name}' was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
  }
}

const handleNameChange = (event) => {
  // console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  // console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  // console.log(event.target.value)
  setNewFilter(event.target.value);
  // const test = 'Arto Hellas'
  // const regex = new RegExp(event.target.value, "i")
  // console.log(regex)
  // console.log(regex.test(test))
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} status="message" />
      <Notification message={errorMessage} status="error" />
      <FilterForm filter={newFilter} handler={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value = {newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value = {newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <PersonsList reg={newFilter} persons={persons} handler={handleDeleteClick} />
      </div>
    </div>
  )

}

export default App