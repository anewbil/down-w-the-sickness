// bdd121ae36755f80f5d281d6baafd415
const apiKey="df3fb9934a7d8ebae97c6749b588071a"
const searchButton=document.querySelector("#search-button")
const mainWeather=document.querySelector(".mainWeather")
const searchInput=document.querySelector("#searchBox")
const weeklyReport=document.querySelector(".five-dayForcast")
const historySection=document.querySelector(".historySection")


function searchCity(city){
fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
).then(function(response){
return response.json()
}).then(function(data){
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
   let weekcard=''
   weekarry.forEach(day=>{
    const weeklyIcon=day.weather[0].icon
    const weekUrl=`https://openweathermap.org/img/wn/${weeklyIcon}.png`
    const date=day.dt_txt.split(" ")[0]
    weekcard+=`
    <div class="wCard">
    <span>${date}</span>
    <img src="${weekUrl}"/>
    <p>temp: ${day.main.temp}</p>
    <p>humidity: ${day.main.humidity}</p>
    <p>Wind MPH: ${day.wind.speed}</p>
    <p>airQuality</p>
    </div>
    `
weeklyReport.innerHTML=weekcard
   })
})
}
//local storage to save value of the input box
function saveSearch(){
    const cityName=searchInput.value.trim()
    const cityArry=JSON.parse(localStorage.getItem("cityArry"))||[]
    console.log(cityArry,cityName)
    if(!cityArry.includes(cityName)){
        cityArry.push(cityName)
        localStorage.setItem("cityArry",JSON.stringify(cityArry))
        makeButton(cityArry)
    }
    
}

//create a button with the text conent of wtv is in local storage
function makeButton(cityArry){
    historySection.innerHTML=""
cityArry.forEach((city)=>{
    console.log(city)
const historyElement=document.createElement("li")
historyElement.textContent=city
historyElement.className+="past-search"
historySection.appendChild(historyElement)

historyElement.addEventListener("click",function(event){
    event.preventDefault()
    let pastCity=historyElement.textContent
    searchCity(pastCity)
    
})
})
}

searchButton.addEventListener("click",function(event){
event.preventDefault()
let city=searchInput.value 
saveSearch()
searchCity(city)
searchInput.value=""
})
