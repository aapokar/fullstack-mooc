import React, {useEffect} from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import {connect} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'


const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  },[])

  console.log(props)
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />


    </div>
  )
}

export default connect(null, {initializeAnecdotes})(App)