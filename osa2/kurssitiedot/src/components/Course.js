import React from 'react'

const Course = ({course}) => {

    return (
        <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </>
    )
}

const Header = (props) => {
    return (
      <>
        <h1>
            {props.course}
        </h1>
      </>
    )
  }

const Content = ({parts}) => {
    const rows = () => parts.map(part =>
    <Part nimi={part.name} tehtavia={part.exercises} key={part.id}/>
    )

    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

const Part = (props) => {

    return (
        <>
          <li>
              {props.nimi} {props.tehtavia}
          </li>
        </>
    )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
    <>
      <p>
      <b>total of {total} exercises</b>
      </p>
    </>
  )
}

export default Course