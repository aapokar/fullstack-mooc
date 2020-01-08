import React from 'react'
import {voteFor} from '../reducers/anecdoteReducer'
import {newNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {
    const anecdotes = props.filteredAnecdotes
    const style = {
      marginBottom: 10
    }
    const vote = (anecdote) => {
        props.voteFor(anecdote)
        props.newNotification(`you voted for '${anecdote.content}'`, 5)
        }

return (   
  <div>
    {anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div style={style}>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
    )}
  </div>
)
}

const anecdotesToShow = ({anecdotes, filter}) => {

  const regex = new RegExp(filter, "i")

  return anecdotes.filter(anecdote => regex.test(anecdote.content)).sort((a,b)=>b.votes-a.votes)
}

const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  newNotification,
  voteFor
}

const ConnectedAnecdoteList = connect(mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList