const Part = ({ partName, exercises }) => {
  return(
    <p>{partName} {exercises}</p>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce((s, part) => s + part.exercises, 0)

  return(
    <p><strong>total of {total} exercises</strong></p>
  )
}


const Content = ({ parts }) => {
  return(
    <div>
      {parts.map((part) => {
       return <Part key={part.id} partName={part.name} exercises={part.exercises} /> 
      })}
    </div>
  )
}


const Header = ({ courseName }) => <h1>{courseName}</h1>


const Course = ({ course }) => {
  return(
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App