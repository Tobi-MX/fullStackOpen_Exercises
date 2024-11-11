import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const findPerson = persons.find((person) => person.name === newName)

    if (findPerson === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewNumber('')
      setNewName('')
    }else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>  
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {persons.map((person) => {
          return <div key={person.name}> {person.name} {person.number}</div>
        })}
      </div>
    </div>
  )
}

export default App