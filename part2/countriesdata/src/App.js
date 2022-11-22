import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = ({countries}) => {
  const [search, setSearch] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [isShown, setIsShown] = useState(false)

  const handleSearchCountries = (event) => {
      setSearch(event.target.value)

      const searchedCountriesList = event.target.value !== '' ? countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())) : []
      setSearchedCountries(searchedCountriesList)
      setIsShown(false)
  }

 return (
    <div> 
      <div>find countries: <input value={search} onChange={handleSearchCountries}/></div>
      <Countries countries={searchedCountries} isShown={isShown} setIsShown={setIsShown}/>
    </div>
  )
}

const Countries = (props) => {
  const countries = props.countries

  const [clickedCountry, setClickedCountry] = useState()

  CountriesDisplay(countries)

  function CountriesDisplay(searchedCountries) {
    
    const countriesLength = searchedCountries.length

    console.log(countriesLength)

    if (countriesLength > 10){
      console.log('Over 10')
      
      return <UndefinedList />
      
    } 
    
    if (countriesLength <= 10 && countriesLength > 1){

      console.log('Between 1 and 10')

      const sortedCountriesList = countries.sort(function (a, b) {
        if (a.name.common < b.name.common){
          return -1
        } else if (a.name.common > b.name.common){
          return 1
        } else{
          return 0
        }
      })

      return <CountriesList countries={sortedCountriesList} handleShown={props.setIsShown} handleClickedCountry={setClickedCountry}/>

    } 
    
    if (countriesLength === 1){
      console.log('one country')

      return <SingleCountry countryData={searchedCountries[0]} />
     
    }

    if (props.isShown === true){

      return <SingleCountry countryData={clickedCountry} />
    }
  }
}

function UndefinedList () {
  return (
    <div>Too many matches, specify another filter</div>
  )
  }

const CountriesList = (props) => {
  const countries = props.countries

  function handleClick(country){

    props.handleShown(true)
    props.handleClickedCountry(country)
  }

  return (
    <ul> 
      {countries.map(country => 
        <li key={country.name.common}>{country.name.common} 
          <Button handleClick={() => handleClick()} />
        </li>)} 
      </ul>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>Show</button> 
  )
}

const SingleCountry = ({country}) => {
  
  return(
    <div>
      <CountryData country={country} />
      <Weather country={country} />
    </div>
  )
}

const CountryData = ({country}) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <div>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
        </div>
        <div>
          <strong>Languages:</strong>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
        </div>
        <div>
          <img src={country.flags.png} alt='country flag'/>
        </div>
      </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return(
    <div>
      {weather.temperature}
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search countries={countries} />
    </div>
  )
}

export default App;
