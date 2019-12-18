import React, { useState } from 'react'
import PersonsList from './components/PersonsList'
import FilterForm from './components/FilterForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555 555'},
    { name: 'Petri Nygård', number: '123 123'},
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')



const addName = (event) => {
  event.preventDefault()
  if (persons.find(({name}) => name === newName)===undefined) {
    const x = persons.concat({name: newName, number: newNumber})
    setPersons(x)
  } else {
    window.alert(`${newName} is already added to phonebook`)

  }
}


const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value);
  const test = 'Arto Hellas'
  const regex = new RegExp(event.target.value, "i")
  console.log(regex)
  console.log(regex.test(test))
}


  return (
    <div>
      <h2>Phonebook</h2>
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
        <PersonsList reg={newFilter} persons={persons} />
      </div>
    </div>
  )

}

export default App