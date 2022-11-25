import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = ({countries}) => {
  const [search, setSearch] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [weather, setWeather] = useState()

  const handleSearchCountries = (event) => {
      setSearch(event.target.value)

      const searchedCountriesList = event.target.value !== '' ? countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())) : []
      setSearchedCountries(searchedCountriesList)
      setIsShown(false)
  }

 return (
    <div> 
      <div>find countries: <input value={search} onChange={handleSearchCountries}/></div>
      <Countries countries={searchedCountries} isShown={isShown} setIsShown={setIsShown} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

const Countries = (props) => {

  const countries = props.countries

  const [clickedCountry, setClickedCountry] = useState()
    
  const countriesLength = countries.length

  if (countriesLength > 10){
    
    return <UndefinedList />
    
  } else if (countriesLength <= 10 && countriesLength > 1){

    const sortedCountriesList = countries.sort(function (a, b) {
      if (a.name.common < b.name.common){
        return -1
      } else if (a.name.common > b.name.common){
        return 1
      } else{
        return 0
      }
    })

    if (props.isShown === true){

      

      return (
        <div>
          <CountriesList countries={sortedCountriesList} handleShown={props.setIsShown} handleClickedCountry={setClickedCountry}/>
          <SingleCountry countryData={clickedCountry} weather={props.weather} setWeather={props.setWeather} />
        </div>
      )
    }

    return <CountriesList countries={sortedCountriesList} handleShown={props.setIsShown} handleClickedCountry={setClickedCountry}/>

  } else if (countriesLength === 1){

    return <SingleCountry countryData={countries[0]} weather={props.weather} setWeather={props.setWeather}/>
    
  }
}


const UndefinedList = () => {
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
          <Button country={country} handleClick={() => handleClick(country)} />
        </li>)} 
      </ul>
  )
}

const Button = (props) => {

  return (
    <button onClick={props.handleClick}>Show</button> 
  )
}

const SingleCountry = (props) => {

  return(
    <div>
      <CountryData country={props.countryData} />
      <Weather country={props.countryData} weather={props.weather} setWeather={props.setWeather}/>
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

const Weather = (props) => {

  const country = props.country
  const weather = props.weather
  const setWeather = props.setWeather
  
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  },[api_key, lat, lng, setWeather])

  if (weather !== undefined) {
    return(
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>
          temperature {weather.main.temp} Celcius
          <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
          </div>
        </div>
        <div>
          wind {weather.wind.speed} m/s
        </div>
      </div>
    )
  } else {
    return null
  }
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
