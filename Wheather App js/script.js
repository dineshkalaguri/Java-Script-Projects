const apikey = "a0acb937fdc6e0837f56e1d00991bc54";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

document.querySelector(".weather").style.display = "none";
document.querySelector(".error").style.display = "none";


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        
        getForecast(city);
    }
}


async function getForecast(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apikey}`);
    const data = await response.json();

    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = ""; 

    
    let forecastByDays = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!forecastByDays[date]) {
            forecastByDays[date] = [];
        }
        forecastByDays[date].push(item);
    });

    
    Object.keys(forecastByDays).slice(0, 5).forEach(date => {
        const forecastData = forecastByDays[date][0];
        
        const forecastEl = document.createElement("div");
        forecastEl.classList.add("forecast-day");

        const weatherCondition = forecastData.weather[0].main;
        let icon = "clear.png";
        
        if (weatherCondition == "Clouds") icon = "clouds.png";
        else if (weatherCondition == "Clear") icon = "clear.png";
        else if (weatherCondition == "Rain") icon = "rain.png";
        else if (weatherCondition == "Drizzle") icon = "drizzle.png";
        else if (weatherCondition == "Mist") icon = "mist.png";

        forecastEl.innerHTML = `
            <p>${new Date(date).toLocaleDateString('en-GB', { weekday: 'long' })}</p>
            <img src="images/${icon}" alt="${weatherCondition}">
            <p>${Math.round(forecastData.main.temp)}°c</p>
            <p>${forecastData.weather[0].description}</p>
        `;

        forecastContainer.appendChild(forecastEl);
    });
}


searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

document.querySelector(".weather").style.display = "none";
document.querySelector(".error").style.display = "none";





