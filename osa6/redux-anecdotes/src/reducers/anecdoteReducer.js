import anecdoteService from '../services/anecdotes'

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {

    const anecdoteToChange = {...anecdote, votes: anecdote.votes +1}
    const changedAnecdote = await anecdoteService.update(anecdote.id, anecdoteToChange)

    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    case 'NEW_NOTE':
      const newNote = action.data
      return state.concat(newNote)
    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }

}

export default anecdoteReducer