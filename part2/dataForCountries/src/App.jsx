import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchVale] = useState('')
  const [filterDisplay, setFilterDisplay] = useState([])
  const [chosen, setChosen] = useState('')
  const [countryDisplay, setCountryDisplay] = useState(null)

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
    .then(response => {
      const allCountriesName = response.data.map(country => country.name.common)
      setAllCountries(allCountriesName)
    })
  }, [])
  
  useEffect(() => {
    if (chosen) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${chosen}`)
      .then(response => {
        const countryData = response.data
        setCountryDisplay(
          <>
            <h1>{countryData.name.common}</h1>
            <div>Capital {countryData.capital}</div>
            <div>Area {countryData.area}</div>

            <h2>Languages</h2>
            <ul>
            {Object.values(countryData.languages).map(lan => <li key={lan}>{lan}</li>)}
            </ul>

            <img src={countryData.flags.png} alt={countryData.flags.src} />
          </>
        )
      })
    }
    
  }, [chosen])

  const onSearch = (event) => {
    const search = event.target.value
    setSearchVale(search)
    const filteredCountry = allCountries.filter(country => 
      country.toLowerCase().includes(search.toLowerCase()) && search !== '')

    if (filteredCountry.length === 1) {
      setChosen(filteredCountry[0])
    }else{
      setChosen(null)
      console.log('H')
    }
    setFilterDisplay(filteredCountry)
  }

  const handleShowClick = (con) => {
    setFilterDisplay([con])
    setChosen(con)
  }

  return(
    <div>
      <div> find countries <input value={searchValue} onChange={onSearch} /> </div>
      
      {filterDisplay.length > 10 ? 
      <div>Too many searches, specify another filter</div>
      : filterDisplay.length === 1 ? 
      countryDisplay  
      :filterDisplay.map(country => 
      <div key={country}>{country} <button onClick={() => handleShowClick(country)}>show</button></div>)
      }
    </div>
    
  )
}

export default App
