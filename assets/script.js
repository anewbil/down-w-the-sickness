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
})
}


searchButton.addEventListener("click",function(event){
event.preventDefault()
let city=searchInput.value 
searchCity(city)
})
