
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [selected, setSelected] = useState('')
  const [weather, setWeather] = useState([]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          setCountries(response.data)

      })
  }, [])

  useEffect(() => {

    if (selected!==''){
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${selected}&units=metric&APPID=b0e24e07ca42a388b08d6f633c266ffd`)
      .then(response => {
          // console.log(response.data)
          setWeather(response.data)
      })
      // .then(console.log(weather))
    }
  }, [selected])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleClick = (maa) => {
    setNewFilter(maa.e.name)
    // console.log(event.target)

  }

  const Country = ({maa}) => {
    const kielet = maa.languages.map(e=> <li key={e.name}>{e.name}</li>)
    return (
      <div>
        <h1>{maa.name}</h1>
          <p>Capital {maa.capital}</p>
          <p>Population {maa.population}</p>
          <h2>languages</h2>
          {kielet}
          <img src={maa.flag} style={{width: 150}} alt="flag"/>
          <Weather pkaupunki={maa.capital} />
      </div>
    )
  }

  const Weather = (props) => {
    const temperature = weather
    const x = (temperature.main)
    if (x!==undefined) {
    // console.log(x.temp)
    
    return (
      <div>
        <h2>Weather in {props.pkaupunki}</h2>
        <div><p><b>temperature: </b>{x.temp} Celsius</p></div>
        <div><p><b>wind: </b>{temperature.wind.speed} m/s</p></div>
      </div>
    )}
    else return null
  }

  const CountriesList = () => {
    const regex = new RegExp(newFilter, "i")
    const filtered = countries.filter(e => regex.test(e.name))
    // console.log('renderöidään maat')

    if (filtered.length> 10) {
      return (<p>Too many matches, specify another filter</p>)
    } else if(filtered.length >1) {
     return filtered.map(e => <p key={e.name}>{e.name} <button onClick={()=>handleClick({e})}>show</button></p>)
    } else if(filtered.length===1) {
      setSelected(filtered[0].capital)
      return (<Country maa={filtered[0]}/>)
    } else {
      return null
    }
  }

  return (
    <div className="App">
      find countries <input
      value= {newFilter}
      onChange= {handleFilterChange}
      />
      <CountriesList />
    </div>
  );
}

export default App;
