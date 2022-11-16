import axios from 'axios'
import { useEffect, useState } from 'react'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

const Person = ({person}) => (<p>{person.name} {person.number}</p>)

const Filter = (props) => {
  return (
    <div> filter shown with <input value={props.value} onChange={props.function}/></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [searchedNames, setNewSearchedNames] = useState([])

  const names = persons.map(person => person.name)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearchChange = (event) => {
    setnewSearch(event.target.value)

    const searchedNamesList = event.target.value !== '' ? persons.filter(person => person.name.includes(event.target.value)) : []

    setNewSearchedNames(searchedNamesList)
  }

  const addPerson = (event) => {

    event.preventDefault()
    
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
      setNewNumber('')
    } else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} function={handleNameSearchChange} />
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={searchedNames} />
    </div>
  )
}

export default App
