import React from 'react'
import Person from './Person'

const PersonsList = (props) => {
    // console.log(props)
const regex = new RegExp(props.reg, "i")
return props.persons.filter(person => regex.test(person.name)).map(person => <Person key={person.name} person={person} handler={props.handler} />)
}

export default PersonsList