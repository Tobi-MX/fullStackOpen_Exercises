import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState(persons)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3002/persons')
    .then(response => {
      console.log('fetched successfully from server')
      setPersons(response.data)
      setShowPersons(response.data)
    })
  }, [])

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