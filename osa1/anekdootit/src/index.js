import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Display = (props) => {
    return (
        <div>
        <p>{props.anecdote}</p>
        <p>has {props.votes} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  function getGreatest(list) {
    let greatest = 0
    let index= -1
    var i;
    for (i=0; i<list.length;i++) {
        if (list[i]>greatest) {
            greatest = list[i]
            index=i
        }
    }
    if (index===-1) {
        return 0
    }
    return index
    }

  const randomNumber = () =>
    Math.round(Math.random()*5)

    function newVotes(index){
        console.log(getGreatest(votes))
        const copy = [...votes]
        // kasvatetaan taulukon paikan 2 arvoa yhdellä
        copy[index] += 1
        return copy
    };

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <Display anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
        <br></br>
        <Button text="new anecdote" onClick={()=>{setSelected(randomNumber())}}/>
        <Button text="vote" onClick={()=>{setVotes(newVotes(selected))}}/>
        <h1>Anecdote with most votes</h1>
        <Display anecdote={props.anecdotes[getGreatest(votes)]} votes={votes[getGreatest(votes)]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)