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
      <CountriesList countries={searchedCountries} isShown={isShown} setIsShown={setIsShown}/>
    </div>
  )
}

const CountriesList = (props) => {
  const countries = props.countries

  const [clickedCountry, setClickedCountry] = useState()

  const [countryData, singleCountryData] = CountriesDisplay(countries)

  function handleClick(country){

    props.setIsShown(true)
    setClickedCountry(country)
  }

  function CountriesDisplay(searchedCountries) {
    
    const countriesLength = searchedCountries.length

    let countryInfo;
    let singleCountryInfo;

    if (countriesLength > 10){
      
      countryInfo = <div>Too many matches, specify another filter</div>
      
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

      countryInfo = <ul> {sortedCountriesList.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleClick(country)}>Show</button> </li>)} </ul>
      
      if (props.isShown === true){
        singleCountryInfo = showCountryData(clickedCountry)
      }

    } else if (countriesLength === 1){
      singleCountryInfo = showCountryData(searchedCountries[0])
      
    }
    
    return [countryInfo, singleCountryInfo]
  }

  function showCountryData(country){

    const singleCountryInfo = <div>
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
      
    return singleCountryInfo
  }

  return (
      <div>
        {countryData}
        {singleCountryData}
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
