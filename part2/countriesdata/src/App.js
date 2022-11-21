import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = ({countries}) => {
  const [search, setSearch] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])



  const handleSearchCountries = (event) => {
      setSearch(event.target.value)

      //Ensure that search is not capital sensitive, seems to lower case the country names    //SORT NAMES ALPHABETICALLY
      const searchedCountriesList = event.target.value !== '' ? countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())) : []
      setSearchedCountries(searchedCountriesList)
  }

 return (
    <div> 
      <div>find countries: <input value={search} onChange={handleSearchCountries}/></div>
      <CountriesList countries={searchedCountries} />
    </div>

  )
}

const CountriesList = ({countries}) => {

  const countryData = CountriesDisplay(countries)


   //Make sure to display one, 10 or text
  function CountriesDisplay(searchedCountries) {
    
      const countriesLength = searchedCountries.length
      let countryInfo;

      if (countriesLength > 10){
        
        countryInfo = <div>Too many matches, specify another filter</div>
        
      } else if (countriesLength <= 10 && countriesLength > 1){
        const sortedCountriesList = countries.map(country => country.name.common).sort()

        countryInfo = <ul> {sortedCountriesList.map(country => <li key={country}>{country}</li>)} </ul>
      } else if (countriesLength === 1){
          const country = searchedCountries[0]

          countryInfo = <div>
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
      }

      return countryInfo
    }

    return (
      <div>
        {countryData}
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
