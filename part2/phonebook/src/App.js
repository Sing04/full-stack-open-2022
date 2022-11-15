import { useState } from 'react'

const Person = (person) => (<p>{person.name}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {

    event.preventDefault()
    const names = persons.map(person => person.name)
    
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    } else{
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App
