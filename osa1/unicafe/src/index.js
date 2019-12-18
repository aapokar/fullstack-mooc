import React, {
  useState
} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.name}</button>
)

const Statistic = ({text,value}) => <p> {text} {value} </p>
    
const Statistics = ({good, bad, neutral, allClicks}) => {
  if (allClicks===0) {
    return null
  }
  function countAverage() {
    if (allClicks===0) {
      return 0
    }
    const newAverage = (good-bad)/allClicks
    console.log(good)

    return newAverage
  }

  function countPositive() {
    if (allClicks===0) {
      return "0"
    }
    const positives = good/allClicks*100
    return positives.toString() + " %"
  }

  return (
  <>
  <h1> statistics </h1> 
  <table>
    <tbody>
      <tr><td><Statistic text="good" value={good}></Statistic></td></tr>
      <tr><td><Statistic text="neutral" value={neutral}></Statistic></td></tr>
      <tr><td> <Statistic text="bad" value={bad}></Statistic></td></tr>
      <tr><td><Statistic text="all" value={allClicks}></Statistic></td></tr>
      <tr><td><Statistic text="average" value={countAverage()}> </Statistic></td></tr>
      <tr><td><Statistic text="positive" value={countPositive()}> </Statistic></td></tr>
      </tbody>
  </table>
  </>
  )
}
    
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const anyClick = () => {

    setAll(allClicks + 1)
    // setAverage(countAverage())
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    anyClick()
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    anyClick()
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    anyClick()
  }


  return ( 
    <div>
      <h1> give feedback1 </h1> 
      <div>
        <Button handleClick={() => handleGoodClick()} name="good"> </Button> 
        <Button handleClick={() => handleNeutralClick()} name="neutral"> </Button> 
        <Button handleClick={() => handleBadClick()} name="bad"> </Button>
        <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks}/> 
      </div> 
 
      </div>
    )
}
                    
ReactDOM.render( < App /> ,document.getElementById('root'))