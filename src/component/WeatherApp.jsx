import React, {useState} from 'react';
import axios from 'axios';

import '../assets/css/weather.css';


function WeatherApp() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2c7dd24e1e3bff6b21b8996b7e265f41`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
            setLocation('');
        }
    }

  return (
    <div className='weatherapp'>
        <div className='base-container flex'>
            <div className='search-location'>
                <input
                    placeholder='Enter Location'
                    type="text"
                    value={location}
                    onKeyPress={searchLocation}
                    onChange={event => setLocation(event.target.value)} />
            </div>
            <div className='top-area'>
                <div className='location'>
                    <p>{data.name}</p>
                </div>
                <div className='temp'>
                    <h1>{data.main && `${Math.round(data.main.temp - 273.15)}°C`}</h1>
                </div>
                <div className='description'>
                    <p>{data.weather && data.weather[0].description}</p>
                </div>
            </div>

            
            {data.name != undefined &&
            <div className='bottom-area'>
                <div className='feels text-center'>
                    <p className='cat-value'>{data.main && `${Math.round(data.main.feels_like - 273.15)}°C`}</p>
                    <p className='cat-name'>Feels like</p>
                </div>
                <div className='humidity text-center'>
                    <p className='cat-value'>{data.main && `${data.main.humidity}%`}</p>
                    <p className='cat-name'>Humidity</p>
                </div>
                <div className='wind text-center'>
                    <p className='cat-value'>{data.wind && `${data.wind.speed} m/s`}</p>
                    <p className='cat-name'>Wind Speed</p>
                </div>
            </div>
            }

            <p className='webdot-title text-center'>Webdot Weather App by ReactJS</p>


        </div>
    </div>
);
}

export default WeatherApp;
