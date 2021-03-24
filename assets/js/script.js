var searchBox = document.getElementById("searchBox");
var searchBtn = document.getElementById("searchBtn");
var cityNM = document.getElementById("cityName");
var date = document.getElementById("date");
var pastCities = document.getElementById("pastCities");
var temperature = document.getElementById("temp");
var windSpeed = document.getElementById("windSpeed");
var pastCities = document.getElementById("pastCities");
var listItem = document.getElementById("listItem");
var uvIndex = document.getElementById("uvIndex");
var topIcon = document.getElementById("topIcon");
var fiveDayForecast = document.getElementById("fiveDayForecast");

//http://openweathermap.org/img/w/10d.png

// VARIABLES
//==========================================================================================
let cityName = "";
var searchedFor = [];
index = 0;
dateArray = [];
temperatureArray = [];
humidityArray = [];
iconArray = [];
//==========================================================================================

//FUNCTIONS
//==========================================================================================

//SHOWS CURRENT DATE
function showDate() {
  currentDate = moment().format("MM/DD/YYYY");
  date.innerHTML = `(${currentDate})`;
}
showDate();

// GETS THE CITY NAME FROM USER ON HTML PAGE
function getCityName() {
  cityName = searchBox.value;
  getWeatherData(cityName);
  showSearchedFor(cityName);
  weeklyForecast.innerHTML = "";
  clearText();
}

//STORES WEATHER DATA INTO VARIABLES
function formatWeatherData(data) {
  weatherData = data;
  city = weatherData.name;
  temp = weatherData.main.temp;
  temp = temperatureConversion(temp);
  hum = weatherData.main.humidity;
  ws = weatherData.wind.speed;
  description = weatherData.weather[0].description;
  icon = weatherData.weather[0].icon;
  showWeatherData(city, temp, hum, ws, description, icon);
  pushToLocalStorage(city, temp, hum, ws, description, icon);
}

// Pushes weather data to local Storage
function pushToLocalStorage(city, temp, hum, ws, description, icon) {
  localStorage.setItem("City", city);
  localStorage.setItem("Temperature", temp);
  localStorage.setItem("Humidity", hum);
  localStorage.setItem("Wind Speed", ws);
  localStorage.setItem("Description", description);
  localStorage.setItem("Icon", icon);
}

// FORMATS AND DISPLAYS 5 DAY FORECAST DATA ON HTML PAGE
function do5DayForecastWork(data) {
  // 5 DAY FORECAST ARRAYS
  dateArray = [];
  temperatureArray = [];
  humidityArray = [];
  iconArray = [];
  for (i = 1; i < 6; i++) {
    dateArray.push(moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
    temperatureArray.push(temperatureConversion(data.daily[i].temp.day));
    humidityArray.push(data.daily[i].humidity);
    iconArray.push(data.daily[i].weather[0].icon);
  }
  show5DayForecast();
  push5DayForecastToLocalStorage();
}

// Stores 5 Day Forecast data to localStorage
function push5DayForecastToLocalStorage() {
  for (i = 0; i < 5; i++) {
    localStorage.setItem(`Date${i}`, dateArray[i]);
    localStorage.setItem(`Day${i} Temperature`, temperatureArray[i]);
    localStorage.setItem(`Day${i} Humidity`, humidityArray[i]);
    localStorage.setItem(`Day${i} Icon`, iconArray[i]);
  }
}

// RENDERS 5 DAY FORECAST TO THE PAGE
function show5DayForecast() {
  for (i = 0; i < 5; i++) {
    weeklyForecast.innerHTML += `
    <div class="col-sm-2">
    <div class="card blueBackground">
    <div class="card-body">
        <h5 class="card-title" style="font-size: 16px">${dateArray[i]}</h5>
        <img src="https://openweathermap.org/img/w/${iconArray[i]}.png">
        <p class="card-text">Temp: ${temperatureArray[i] + " &#8457;"}</p>
        <p>Humidity: ${humidityArray[i]}%</p>
    </div>
    </div>
    </div>    
`;
  }
}

//STORES DATA INTO VARIABLES AND PASSES IT TO FUNCTION THAT MAKES API CALL
function formatUVindex(data) {
  lat = weatherData.coord.lat;
  lon = weatherData.coord.lon;
  getUVIndex(lat, lon);
  get5DayForecast(lat, lon);
}

//ADDS DATA TO HTML
function showWeatherData(city, temp, hum, ws, description, icon) {
  cityNM.innerHTML = city;
  temp.innerHTML = `Temperature: ${temp} &#8457;`;
  humidity.innerHTML = `Humidity: ${hum}%`;
  windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
  iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
  topIcon.innerHTML = `
    <img src="${iconSrc}" alt="">
    `;
}

//ADDS UV INDEX TO HTML
function showUVIndex(data) {
  UVData = data;
  finalUVIndex = UVData.value;
  localStorage.setItem("UV Index", finalUVIndex);
  uvColorNumber = finalUVIndex.toFixed(0);
  if (uvColorNumber <= 2) {
    uvColorNumber = "green";
  } else if (uvColorNumber >= 3 && uvColorNumber <= 5) {
    uvColorNumber = "yellow";
  } else if (uvColorNumber >= 6 && uvColorNumber <= 7) {
    uvColorNumber = "orange";
  } else if (uvColorNumber >= 8 && uvColorNumber <= 10) {
    uvColorNumber = "red";
  } else if (uvColorNumber >= 11) {
    uvColorNumber = "violet";
  }
  uvIndex.innerHTML = `UV Index: <button class="btn" style="background-color:${uvColorNumber}">${finalUVIndex}</button>`;
  localStorage.setItem("uvColor", uvColorNumber);
}

// REMOVES HIDDEN CLASS AND ADDS SEARCH HISTORY CITIES TO AN ARRAY
function showSearchedFor() {
  cityNM.classList.remove("hidden");
  pastCities.classList.remove("hidden");
  searchedFor.push(cityName);
  searchedFor.forEach(addCitytoSearchHistory);
}

// ADDS SEARCH HISTORY CITIES FROM ARRAY TO HTML
function addCitytoSearchHistory() {
  if (searchedFor[index] !== undefined) {
    newListItem = document.createElement("button");
    newListItem.setAttribute("id", index);
    newListItem.classList.add("btn");
    newListItem.classList.add("customBtn");
    pastCities.append(newListItem);
    newListItem.innerHTML = `${searchedFor[index]}`;
    index = index + 1;
  }
}

// MAKES API CALL FOR CITIES IN THE SEARCH HISTORY
function showHistory() {
  weeklyForecast.innerHTML = "";
  getWeatherData(previousCityName);
}

// Clears content in text input after "search" button clicked
function clearText() {
  searchBox.value = "";
}

function getLocalStorageData() {
  city = localStorage.getItem("City");
  temp = localStorage.getItem("Temperature");
  hum = localStorage.getItem("Humidity");
  ws = localStorage.getItem("Wind Speed");
  UV = localStorage.getItem("UV Index");
  uvColor = localStorage.getItem("uvColor");
  icon = localStorage.getItem("Icon");
  showWeatherOnRefresh(city, temp, hum, ws, UV, uvColor, icon);
  show5DayForecastOnRefresh();
}

function showWeatherOnRefresh(city, temp, hum, ws, UV, uvColor, icon) {
  cityNM.classList.remove("hidden");
  cityNM.innerHTML = city;
  temperature.innerHTML = `Temperature: ${temp} &#8457;`;
  humidity.innerHTML = `Humidity: ${hum}%`;
  windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
  uvIndex.innerHTML = `UV Index: <button class="btn" style="background-color:${uvColor}">${UV}</button>`;
  iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
  topIcon.innerHTML = `
    <img src="${iconSrc}" alt="">
    `;
}

function show5DayForecastOnRefresh() {
  for (i = 0; i < 5; i++) {
    date = localStorage.getItem(`Date${i}`);
    temp = localStorage.getItem(`Day${i} Temperature`);
    hum = localStorage.getItem(`Day${i} Humidity`);
    icon = localStorage.getItem(`Day${i} Icon`);
    weeklyForecast.innerHTML += `
    <div class="col-sm-2">
    <div class="card blueBackground">
    <div class="card-body">
        <h5 class="card-title" style="font-size: 16px">${date}</h5>
        <img src="https://openweathermap.org/img/w/${icon}.png">
        <p class="card-text">Temp: ${temp + " &#8457;"}</p>
        <p>Humidity: ${hum}%</p>
    </div>
    </div>
    </div>    
`;
  }
}

//==========================================================================================

// EVENT LISTENERS
//==========================================================================================
$(pastCities).click(function (e) {
  previousCity = e.target.id;
  previousCityName = searchedFor[previousCity];
  showHistory(previousCityName);
});

searchBtn.addEventListener("click", getCityName);

window.onload = function () {
  if (localStorage.getItem("City") === null) {
    fiveDayForecast.innerHTML = "";
  } else {
    getLocalStorageData();
  }
};

//==========================================================================================
