import axios from 'axios'
import { useEffect, useState } from 'react'
import phonebookService from './services/persons'

const Notification = (props) => {
  const notification = props.message;

  const notificationStyle = {
    fontSize: 20,
    color: notification.color,
    border: `2px solid ${notification.color}`,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#CCCCCC'
  }
  if (notification.message === null){
    return <div></div>
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const Persons = ({searchedNames, persons, setPersons, setNewSearchedNames}) => {
  return (
    <div>
      {searchedNames.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setNewSearchedNames={setNewSearchedNames} searchedNames={searchedNames}/>)}
    </div>
  )
}

const Person = ({person, persons, setPersons, setNewSearchedNames, searchedNames}) => (<div>{person.name} {person.number} <DeleteButton person={person} persons={persons} setPersons={setPersons} setNewSearchedNames={setNewSearchedNames} searchedNames={searchedNames}/></div>)

const Filter = (props) => {
  return (
    <div> filter shown with <input value={props.value} onChange={props.function}/></div>
  )
}

const DeleteButton = ({person, persons, setPersons, setNewSearchedNames, searchedNames}) =>{
  
  function handleDelete(selectedPerson){
    //Creates pop-up confirm window to confirm deletion
    const confirmDeletion = window.confirm(`Delete ${selectedPerson.name} ?`)

    //If user clicks 'ok', deletes person from server
    if (confirmDeletion){
      phonebookService
        .deletePerson(selectedPerson.id)
        .then(response => {
          if (response === 200){
            //If the deletion is successful, resets persons list without the deleted person
            setPersons(persons.filter(person => person.id !== selectedPerson.id))
            //Updates the numbers list without the deleted person
            setNewSearchedNames(searchedNames.filter(person => person.id !== selectedPerson.id))
          }
        }).catch(error => {
          alert(`Error: deletion of ${selectedPerson} unsuccessful`)
        })
    }
    
  }
  return (
    <button onClick={() => handleDelete(person)}>delete</button>
  )
}

const PersonForm = ({persons, setPersons, searchedNames, setNewSearchedNames, setNotificationMessage}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //Sets the new person's name
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //Sets the new person's number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Handles addition of new person to JSON server
  const addPerson = (event) => {

    event.preventDefault()
    
    const samePerson = persons.find(person => person.name.includes(newName))
    
    //If the user wants to add a person that already exists, create pop-up confirmation to modify person's number
    if (samePerson !== undefined){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)

      if (confirmUpdate){
        const changedPerson = {...samePerson, number: newNumber}
        //If user confirms, update person's number in the server
        phonebookService
          .update(samePerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            //Add the person to the searched names list if the user used the filter field while adding a new person
            if (searchedNames.length !== 0){ 
              setNewSearchedNames(searchedNames.map(person => person.id !== samePerson.id ? person : returnedPerson))
            }
          }).catch(error => {
            //Generate notification that the person has already been deleted
            setNotificationMessage({
              message: `Information of ${changedPerson.name} has already been removed from the server`,
              color: 'red'
            })
            setTimeout(() => {
              setNotificationMessage({
                message: null,
                color: 'white'})
            }, 4000)
          })
      }
    
    //If the person does not exist already, create a new person in the server
    } else{
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          //Add the person to the searched names list if the user used the filter field while adding a new person
          if (searchedNames.length !== 0){ 
            setNewSearchedNames(searchedNames.concat(returnedPerson))
          }
          //Generate message that person was added for 4 seconds
          setNotificationMessage({
            message: `Added ${returnedPerson.name}`,
            color: 'green'
            })
          setTimeout(() => {
            setNotificationMessage({
              message: null,
              color: 'white'})
          }, 4000)

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
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    color: 'white'
  })

  console.log(notificationMessage)
  //Downloads data from JSON server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  //Updates search state depending on user input
  const handleNameSearchChange = (event) => {
    setnewSearch(event.target.value)

    const searchedNamesList = event.target.value !== '' ? persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())) : []

    setNewSearchedNames(searchedNamesList)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification message={notificationMessage} />
      </div>
      <div>
        <Filter value={newSearch} function={handleNameSearchChange} />
      </div>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} searchedNames={searchedNames} setNewSearchedNames={setNewSearchedNames} setNotificationMessage={setNotificationMessage} />
      <h3>Numbers</h3>
      <Persons searchedNames={searchedNames} persons={persons} setPersons={setPersons} setNewSearchedNames={setNewSearchedNames}/>
    </div>
  )
}

export default App
