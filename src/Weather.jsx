import React, { useEffect, useState } from 'react'

/*Images */
import searchIcon from "./assets/images/search.png"
import clearIcon from "./assets/images/clear.png"
import cloudsIcon from "./assets/images/clouds.png"
import drizzleIcon from "./assets/images/drizzle.png"
import humidityIcon from "./assets/images/humidity.png"
import mistIcon from "./assets/images/mist.png"
import rainIcon from "./assets/images/rain.png"
import snowIcon from "./assets/images/snow.png"
import windIcon from "./assets/images/wind.png"


const WeatherImgDetails = ({iconvar,tempvar,cityvar,countryvar,latvar,longvar,humvar,windvar}) => {
  return (
    <>
      <div className="img">
        <img src={iconvar} alt="Image" />
      </div>
      <div className="temp">{tempvar}°C</div>
      <div className="city">{cityvar}</div>
      <div className="country">{countryvar}</div>
      <div className="cord">
        <div className="lat">Lattitude
          <span>{latvar}</span>
        </div>
        <div className="long">Longttitude
          <span>{longvar}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} className="icon" alt="humidity" />
          <div className="data">
            <div className="hum-per">{humvar}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} className="icon" alt="wind" />
          <div className="data">
            <div className="wind-per">{windvar}</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      
     
      </div>
    </>
  )
}




const Weather = () => {
    let key="a991f9bb08225656020666608eec1d71"
   const [text,settext]=useState("Coimbatore")
  const [icon,seticon]=useState(snowIcon)
  const[temparature,settemparature]=useState(0)
  const[city,setcity]=useState()
  const [country,setcountry]=useState()
  const[lat,setlat]=useState(0)
  const [long,setlong]=useState(0)
  const [humidity,sethumidity]=useState(0)
  const [wind,setwind]=useState(0)
  
  const [citynotfound,setcitynotfound]=useState(false)
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState(null)

  const iconmap={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudsIcon,
    "02n": cloudsIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n":  rainIcon,
    "10d":  rainIcon,
    "10n":  rainIcon,
    "13d": snowIcon,
    "13n": snowIcon
  }

  const search= async () =>{
   
    setloading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}&units=Metric`
    try {
      let res= await fetch(url)
      let data= await res.json()
      if(data.cod === "404"){
        console.log("city not found")
        setcitynotfound(true)
        setloading(false)
        return
      }

      settemparature(Math.floor(data.main.temp))
      setcity(data.name)
      setcountry(data.sys.country)
      setlat(data.coord.lat)
      setlong(data.coord.lon)
      sethumidity(data.main.humidity)
      setwind(data.wind.speed)

      let iconcode=data.weather[0].icon
      seticon(iconmap[iconcode] || clearIcon)

      setcitynotfound(false)
  
    } catch (error) {
      console.error("an error occured",error.message)
      seterror("An error occured while fetching weather data")
    }
    finally{
      setloading(false)
    }

  }

  const handlesearch =(e) =>{
    settext(e.target.value)
  }

  const handlekey=(e) =>{
    if(e.key==="Enter"){
      search()
    }
    
  }

  useEffect (function (){
    search()
  }, [])  

  
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityinput" placeholder="searchcity"  
        onChange={handlesearch} value={text} onKeyDown={handlekey}/>
        <div className="search-icon">
          <img src={searchIcon} alt="search" onClick={() =>search()} />
          </div>

          </div>

          {!loading && !citynotfound && < WeatherImgDetails iconvar={icon} tempvar={temparature} 
        cityvar={city} countryvar={country} latvar={lat} longvar={long} humvar={humidity} windvar={wind}/>}

        {loading &&<div className="loadmsg">Loading...</div>}
        {error &&<div className="errmsg">{error}</div>}
        {citynotfound&&<div className="citynf">City not found</div>}

        <p className="copy-rights">
        Designed By <span>Mohinth</span>
        </p>

    </div>

    </>
    
  )
}

export default Weather