import { useState } from 'react'


const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}> {text} </button>
  )
}


const StatisticLine = ({ text, value }) => {
  return(
    <div>
    {text} {value}
    </div>
  )
}


const Statistics = ({ good, neutral, bad, total}) => {
  if (good === 0 & neutral === 0 & bad === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(good*1 + bad*-1)/total} />
      <StatisticLine text="positive" value={`${good/total * 100} %`} />
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }


  return (
    <div>
      <h1>give feedback here</h1>
      
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
        
    </div>
  )
}

export default App