import React from 'react'
import Person from './Person'

const PersonsList = (props) => {
const regex = new RegExp(props.reg, "i")
return props.persons.filter(person => regex.test(person.name)).map(person => <Person key={person.name} name={person.name} number={person.number} />)
}

export default PersonsList