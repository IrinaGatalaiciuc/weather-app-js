const cities = document.getElementsByClassName('city')
const cityInputs = document.getElementsByClassName('city-input')
const cityWeather = document.getElementsByClassName('city-weather')


function showWeather(city, idx) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f814306a42fa04ca1cb0b275578ab92e`)
        .then(response => response.json())
        .then(obj => {
            cityInputs[idx].value = obj.name

            if (obj.weather[0].main == "Clear") {
                cities[idx].style.backgroundImage = "url(./images/clear.jpg)"
            } else if (obj.weather[0].main == "Rain") {
                cities[idx].style.backgroundImage = "url(./images/rain.jpg)"
            } else if (obj.weather[0].main == "Mist") {
                cities[idx].style.backgroundImage = "url(./images/mist.jpg)"
            } else if (obj.weather[0].main == "Snow") {
                cities[idx].style.backgroundImage = "url(./images/snow.jpg)"
            } else if (obj.weather[0].main == "Clouds") {
                cities[idx].style.backgroundImage = "url(./images/clouds.jpg)"
            }
            cityWeather[idx].innerHTML = `
    <h2>Temperature: ${Math.round(obj.main.temp - 273.15)}°C</h2>
    <p>Pressure: ${Math.round(obj.main.pressure)}mm/hg</p>
    <p>Humidity: ${Math.round(obj.main.humidity)} %</p>
    <p>Visibility: ${Math.round(obj.visibility / 1000)}km</p>
    <p>Wind: ${Math.round(obj.wind.speed)}km/h</p>
    `
        })
}

Array.from(cityInputs).forEach((cityInput, idx) => {
    cityInput.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            showWeather(cityInput.value, idx)
        }
    })
})
