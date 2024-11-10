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


const Header = ({ courseName }) => <h2>{courseName}</h2>


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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course}/>)}
    </div>
  )
}
export default App