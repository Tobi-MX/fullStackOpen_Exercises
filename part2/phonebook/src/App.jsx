import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const findPerson = persons.find((person) => person.name === newName)

    if (findPerson === undefined) {
      setPersons(persons.concat({ name: newName }))
      setNewName('')
    }else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {persons.map((person) => {
          return <div key={person.name}>{person.name}</div>
        })}
      </div>
    </div>
  )
}

export default App