import React, { useState } from 'react';
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import cloudy_icon from '../Assets/cloudy.png'
import snowy_icon from '../Assets/snowy.png'
import storm_icon from '../Assets/storm.png'
import sun_icon from '../Assets/sun.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import clouds_icon from '../Assets/clouds.png'
import rain_icon from '../Assets/rain.png'


const WeatherApp = () => {
    let api_key = "0a61657823c560c7626cfe5f5b9771fe";

    const [wicon, setWicon] = useState(cloudy_icon);


    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
           return 0; 
        }
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

         humidity[0].innerHTML = data.main.humidity+" %";
         wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
         temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
         location[0].innerHTML = data.name;


        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){ 

            setWicon(sun_icon);

        }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){

            setWicon(cloudy_icon);  

        }else if(data.weather[0].icon==="011d" || data.weather[0].icon==="011n"){

            setWicon(storm_icon);

        }else if(data.weather[0].icon==="013d" || data.weather[0].icon==="013n"){

            setWicon(snowy_icon);

        }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){

            setWicon(clouds_icon);

        }else if(data.weather[0].icon==="010d" || data.weather[0].icon==="010n"){

            setWicon(rain_icon);
        }

    }   
    return (
        <div className='container'>
          <div className="top-bar">
         <input type="text" className="cityInput" placeholder='search' />
         <div className='search-icon' onClick={() => {search()}}>
            <img src={search_icon} alt='' width={'50px'}/>
            </div>
         </div>
         <div className="weather-image">
            <img src={wicon} alt="" width={'150px'}/>
         </div>
         <div className="weather-temp">24°C</div>
         <div className="weather-location">Sofia</div>
         <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" width={'50px'} />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" width={'50px'} />
                <div className="data">
                    <div className="wind-rate">16 km</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
         </div>
        </div>
    );
}

export default WeatherApp;
