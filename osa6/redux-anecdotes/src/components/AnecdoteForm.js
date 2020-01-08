import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {newNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {


const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.newNotification(`you added '${content}'`)
    props.addAnecdote(content)
}

return (
    <>
    <h2>create new</h2>
    <form onSubmit={addNote}>
        <div><input name="note"/></div>
        <button type="submit">create</button>
    </form>
    </>
)
}

  const mapDispatchToProps = {
    newNotification,
    addAnecdote
  }
  
  const ConnectedAnecdoteForm = connect(null,
    mapDispatchToProps
    )(AnecdoteForm)

export default ConnectedAnecdoteForm