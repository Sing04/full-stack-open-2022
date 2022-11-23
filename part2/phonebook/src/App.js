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

const PersonForm = ({persons, setPersons}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const names = persons.map(person => person.name)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }
  return (
    <form onSubmit={addPerson}>
        <FormInput text='name:' value={newName} handleChange={handleNameChange}/>
        <FormInput text='number:' value={newNumber} handleChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const FormInput = ({text, value, handleChange}) => {
  return (
    <div> {text} <input value={value} onChange={handleChange}/></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newSearch, setnewSearch] = useState('')
  const [searchedNames, setNewSearchedNames] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameSearchChange = (event) => {
    setnewSearch(event.target.value)

    const searchedNamesList = event.target.value !== '' ? persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())) : []

    setNewSearchedNames(searchedNamesList)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} function={handleNameSearchChange} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      <Persons persons={searchedNames} />
    </div>
  )
}

export default App
