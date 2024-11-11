import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [showPersons, setShowPersons] = useState(persons)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const findPerson = persons.find((person) => person.name === newName)

    if (findPerson === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
      setShowPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
      setNewNumber('')
      setNewName('')
      setFilter('')
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

  const handleFilterChange = (e) => {
    const filterCheck = persons.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setShowPersons(filterCheck)
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={handleFilterChange} /></div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>  
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {showPersons.map((person) => {
          return <div key={person.id}> {person.name} {person.number}</div>
        })}
      </div>
    </div>
  )
}

export default App