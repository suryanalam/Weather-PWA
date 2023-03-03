import './App.css';
import { useState } from 'react';
import {fetchWeather} from './api/fetchWeather';
import {FaGlobe} from 'react-icons/fa';
import {FiArrowUp, FiArrowDown} from 'react-icons/fi';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = async (e)=>{
    if(e.key === 'Enter' && e.target.value !== ''){
      const data = await fetchWeather(query);
      setWeather(data);
      console.log(data);
      setQuery('');
    }
  }

  return (
    <div className="App">
      <input type="search" className='search-bar' placeholder="Enter city: "  value={query}  onChange={(e)=>{setQuery(e.target.value)}} onKeyPress = {search} />
     
      {
        weather.main && (
          <>      
            <div className='card'>
              <p className='location'><FaGlobe size="0.8rem"/> {weather.name} [{weather.sys.country}] </p>

              <div className='child1'>

                  <div className='left'>
                      <p>{weather.weather[0].main}
                        <span>
                          <img className="temp-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        </span>
                      </p>
                      <p>feels like {Math.round(weather.main.feels_like)}<sup>&deg;c</sup></p>
                      <div className='min-max'>
                        <span><FiArrowDown className='min'/> {Math.round(weather.main.temp_min)}<sup>&deg;c</sup></span>
                        <span><FiArrowUp className='max'/> {Math.round(weather.main.temp_max)}<sup>&deg;c</sup></span>
                    </div>
                  </div>

                  <div className='right'>
                      <h2>{Math.round(weather.main.temp)}<span><sup>&deg;</sup>C</span></h2>
                  </div>   
              
              </div>

              <hr></hr>

              <div className='child2'>
                  <div className='categories'>
                      <p>Humidity</p>
                      <span>{weather.main.humidity} %</span>
                  </div>
               
                  <div className='categories'>
                      <p>Wind</p>
                      <span>{weather.wind.speed} km/h</span>
                  </div>
                  
                  <div className='categories'>
                      <p>Pressure</p>
                      <span>{weather.main.pressure} mb</span>
                  </div>
              </div>
            </div>
          </>
        )
      }

    </div>
  );
}

export default App;
