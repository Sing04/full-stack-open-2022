import { useState } from 'react'

const Person = (person) => (<p>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [searchedNames, setNewSearchedNames] = useState([])

  const names = persons.map(person => person.name)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearchChange = (event) => {
    setnewSearch(event.target.value)
    console.log(event.target.value)

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
      <div> filter shown with <input value={newSearch} onChange={handleNameSearchChange}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchedNames.map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App
