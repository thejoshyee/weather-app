import React, { useState } from "react"

function App() {

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})
  const [author, setAuthor] = useState("")


  const search = e => {
    if(e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery("")
        getBackground()
      })
    } 
  }

  const getBackground = e => {
      let app = document.querySelector(".app")
      fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${query}`)
      .then(res => res.json())
      .then(data => {
          app.style.backgroundImage = `url(${data.urls.regular})`
          setAuthor(`Photo by: ${data.user.name}`)
      })
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }


  return (

<div className="app">
  <main>
        <div className="search-box">
                <input 
                type="text" 
                className="search-bar" 
                placeholder="Search City..."
                onChange={e => setQuery(e.target.value)} 
                value={query}
                onKeyPress={search}
                />
                
        </div>

        {(typeof weather.main != "undefined") ? ( 
          <>
          <div className="weather-wrapper">
            <div className="top-half">
                  <div className="location-box">
                      <div className="location" >{`${weather.name}, ${weather.sys.country}` }</div>
                      <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                      <div className="temp">
                      {Math.round(weather.main.temp)}°f
                      </div>
                      <div className="weather">
                        {weather.weather[0].main.toUpperCase()}
                      </div>
                  </div>
            </div>
          </div>
              <div className="author">{author}</div>
          </>
        ) : ("")}

  </main>
</div>

  )
}

export default App;
