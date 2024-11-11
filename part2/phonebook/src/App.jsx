import { useState } from 'react'

const SinglePerson = ({ person }) =>{
  return(
    <div> {person.name} {person.number} </div>
  )
}


const Persons = ({ personsDisplay }) => {
  return(
    <div>
      {personsDisplay.map((person) => {
        return <SinglePerson key={person.id} person={person} />
      })}
    </div>
  )
}


const PersonForm = (props) => {
  return(
    <form onSubmit={props.Submit}>
        <div> name: <input value={props.nameVal} onChange={props.nameOnWrite} /> </div>
        <div> number: <input value={props.numberVal} onChange={props.numberOnWrite}/> </div>  
        
        <div>
          <button type={props.buttonType}>{props.buttonText}</button>
        </div>
    </form>
  )
}


const Filter = ({ text, value, onWrite}) => {
  return(
    <div>
      {text} <input value={value} onChange={onWrite} />
    </div>
  )
}


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

  const handleNameChange = (e) => {setNewName(e.target.value)}

  const handleNumberChange = (e) => {setNewNumber(e.target.value)}

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
      <Filter text='filter shown with' value={filter} onWrite={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm Submit={handleSubmit} 
        nameVal={newName} nameOnWrite={handleNameChange}
        numberVal={newNumber} numberOnWrite={handleNumberChange}
        buttonType='submit' buttonText='add'
      /> 

      <h3>Numbers</h3>
      <Persons personsDisplay={showPersons} />
    </div>
  )
}

export default App