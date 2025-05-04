import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const SinglePerson = ({ person, onClickBtn }) =>{
  return(
    <div> {person.name} {person.number} <button onClick={onClickBtn} id={person.id} name={person.name}>delete</button> </div>
  )
}


const Persons = ({ personsDisplay, delPerson }) => {
  return(
    <div>
      {personsDisplay.map((person) => {
        return <SinglePerson key={person.id} person={person} onClickBtn={delPerson} />
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


const Notification = ({ message, classN }) => {
  if (message === null) {
    return null
  }

  return(
    <div className={classN} >{message}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState(persons)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notifyMessage, setNotifyMessage] = useState([])

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      console.log('fetched successfully from server')
      setPersons(initialPersons)
      setShowPersons(initialPersons)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const findPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    const updated = { name: newName, number: newNumber }

    if (findPerson === undefined) {
      personService
      .create(updated)
      .then(personUpdate => {
        setPersons(persons.concat(personUpdate))
        setShowPersons(persons.concat(personUpdate))
        setNotifyMessage([`Added ${personUpdate.name}`, 'success'])
        setTimeout(() => {
          setNotifyMessage([])
        }, 3000)
      })
    }else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(findPerson.id, updated)
        .then(updatedPerson => {
          const updatedList = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
          setPersons(updatedList)
          setShowPersons(updatedList)
        })
        .catch(error => {
          const newList = persons.filter(person => person.id !== findPerson.id)
          setPersons(newList)
          setShowPersons(newList)
          setNotifyMessage([`Information of ${updated.name} has already been removed from the server`, 'error'])
          setTimeout(() => {
            setNotifyMessage([])
          }, 3000)
        })
      }
    }
    setNewNumber('')
    setNewName('')
    setFilter('')
  }

  const deletePerson = (e) => {
    if (window.confirm(`Delete ${e.target.name} ?`)) {
      personService
      .deleteID(e.target.id)
      .then(deletedPerson => {
        const newList = persons.filter(person => person.id !== deletedPerson.id)
        setPersons(newList)
        setShowPersons(newList)
      })
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
      <Notification message={notifyMessage[0]} classN={notifyMessage[1]}/>
      
      <Filter text='filter shown with' value={filter} onWrite={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm Submit={handleSubmit} 
        nameVal={newName} nameOnWrite={handleNameChange}
        numberVal={newNumber} numberOnWrite={handleNumberChange}
        buttonType='submit' buttonText='add'
      /> 

      <h3>Numbers</h3>
      <Persons personsDisplay={showPersons} delPerson={deletePerson} />
    </div>
  )
}

export default App