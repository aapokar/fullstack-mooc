import React, { useState } from 'react'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import { BrowserRouter as Router,
  Route, Link, Redirect, withRouter } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/" >anecdotes</Link>
      <Link style={padding} to="/create" >create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const newNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    newNotification(`New anecdote ${anecdote.content} created`)
  }

  const anecdoteById = (id) => {
    console.log('id', id)
    return anecdotes.find(a => a.id === id)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Route exact path="/anecdotes/:id" render={({match}) =>
        <Anecdote anecdote={anecdoteById(match.params.id)} />
      } />
      <Route exact path="/" render={() =>
      <AnecdoteList anecdotes={anecdotes} />
      } />
      <Route exact path="/about" render={() =>
      <About />
      } />
      <Route exact path="/create" render={() =>
      <CreateNew addNew={addNew} />
      } />
      <Footer />
      </Router>
    </div>
  )
}

export default App;