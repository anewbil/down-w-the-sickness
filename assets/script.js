// bdd121ae36755f80f5d281d6baafd415
const apiKey="df3fb9934a7d8ebae97c6749b588071a"
const searchButton=document.querySelector("#search-button")
const mainWeather=document.querySelector(".mainWeather")
const searchInput=document.querySelector("#searchBox")


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
})
}


searchButton.addEventListener("click",function(event){
event.preventDefault()
let city=searchInput.value 
searchCity(city)
})
