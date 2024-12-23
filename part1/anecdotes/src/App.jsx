import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})
  const [highest, setHighest] = useState(Math.floor(Math.random() * 8))

  const randomSelector = () => {
    const nextRandomIndex = Math.floor(Math.random() * 8)
    setSelected(nextRandomIndex)
  }

  const eachVote = () => {
    const votesCopy = { ...votes }
    votesCopy[selected] += 1
    const highestVal = Math.max(...Object.values(votesCopy))

    for(let key in votesCopy){
      if(votesCopy[key] === highestVal && votesCopy[highest] !== highestVal){
        setHighest(key)
      }
    }
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes

      <div>
        <button onClick ={eachVote}>vote</button>
        <button onClick={randomSelector}> next anecdotes </button>
      </div>

      <h1>Anecdotes with most vote</h1>
      {anecdotes[highest]}
    </div>
  )
}

export default App
