// bdd121ae36755f80f5d281d6baafd415
const apiKey="df3fb9934a7d8ebae97c6749b588071a"
const searchButton=document.querySelector("#search-button")
const mainWeather=document.querySelector(".mainWeather")
const searchInput=document.querySelector("#searchBox")
const weeklyReport=document.querySelector(".five-dayForcast")


function searchCity(city){
fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
).then(function(response){
return response.json()
}).then(function(data){
    console.log(data)
    const code=data.weather[0].icon
    const url=`https://openweathermap.org/img/wn/${code}.png`
    const todaysWeather=`
    <div>
    <h1>${data.name}</h1>
    <img src="${url}"/>
    <p>temp: ${data.main.temp}</p>
    <p>humidity: ${data.main.humidity}</p>
    <p>Wind MPH: ${data.wind.speed}</p>
    </div>
    `
    mainWeather.innerHTML=todaysWeather
    const lat=data.coord.lat
    const lon=data.coord.lon
    getFiveDayForcast(lat,lon)
})
}
function getFiveDayForcast(lat,lon){
fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
).then(function(response){
    return response.json()
}).then(function(weekdata){
   let weekarry=weekdata.list.filter(day => day.dt_txt.includes("12:00:00"))
   console.log(weekarry)
   let weekcard=''
   weekarry.forEach(day=>{
    const weeklyIcon=day.weather[0].icon
    const weekUrl=`https://openweathermap.org/img/wn/${weeklyIcon}.png`
    const date=day.dt_txt.split(" ")[0]
    console.log(date)
    weekcard+=`
    <div>
    <span>${date}</span>
    <img src="${weekUrl}"/>
    <p>temp: ${day.main.temp}</p>
    <p>humidity: ${day.main.humidity}</p>
    <p>Wind MPH: ${day.wind.speed}</p>
    </div>
    `
weeklyReport.innerHTML=weekcard
   })
})
}


searchButton.addEventListener("click",function(event){
event.preventDefault()
let city=searchInput.value 
searchCity(city)
})
