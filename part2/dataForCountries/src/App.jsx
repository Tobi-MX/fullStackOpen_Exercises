import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchVale] = useState('')
  const [filterDisplay, setFilterDisplay] = useState([])
  const [chosen, setChosen] = useState('')
  const [countryDisplay, setCountryDisplay] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

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
      let countryData;
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${chosen}`)
      .then(response => {
        countryData = response.data
        return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&units=metric&appid=${api_key}`)
      })
      .then(weather => {
        const weatherData = weather.data
        const capital = countryData.capital.map(cap => cap !== countryData.capital.at(-1) ? `${cap}, ` : cap)
        setCountryDisplay(
          <>
            <h1>{countryData.name.common}</h1>
            <div>Capital {capital}</div>
            <div>Area {countryData.area}</div>

            <h2>Languages</h2>
            <ul>
            {Object.values(countryData.languages).map(lan => <li key={lan}>{lan}</li>)}
            </ul>
            <img src={countryData.flags.png} alt={countryData.flags.src} />

            <h2>Weather in {capital}</h2>
            <div>Temperature {weatherData.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
            <div>Wind {weatherData.wind.speed} m/s</div>

          </>
        )
      })
      .catch((response) => {
        setCountryDisplay(
          <>
          <h2>This country is not available, Check for another</h2>
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
