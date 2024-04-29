import { country, date, img, temperature, tempText, searchForm, searchInput } from "./const.js";

document.addEventListener("DOMContentLoaded", ()=> {
    getWeatherData()
})

async function getWeatherData(region = "Tashkent") {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=10&aqi=yes&alerts=yes`, {
        method: "GET"
    })

    data.json()
        .then(res => {
            if (res.error) {
                throw new Error("Bunday shahar mavjud emas")
            }
            renderWeather(res)
        })
        .catch(err => {
            alert(err)
        })
}

function renderWeather(data) {
    console.log(data);
    country.innerHTML = `${data.location.name} ${data.location.country}`
    temperature.innerHTML = `${data.current.temp_c}°`
    img.src = data.current.condition.icon 
    date.innerHTML = `${data.location.localtime}`
    tempText.innerHTML = `${data.current.condition.text}`
    
}

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    getWeatherData(searchInput.value)
})