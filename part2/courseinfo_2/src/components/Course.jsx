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

export default Course