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
var topIcon = document.getElementById('topIcon');


//http://openweathermap.org/img/w/10d.png


// VARIABLES
//==========================================================================================
let cityName = "";
var searchedFor = [];
index = 0;
dateArray = [];
temperatureArray = [];
humidityArray = [];
//==========================================================================================





//FUNCTIONS
//==========================================================================================

//SHOWS CURRENT DATE
function showDate() {
  currentDate = moment().format("dddd MMMM Do YYYY");
  date.innerHTML = `(${currentDate})`;
}
showDate();

// GETS THE CITY NAME FROM USER ON HTML PAGE
function getCityName() {
  cityName = searchBox.value;
  getWeatherData(cityName);
  showSearchedFor(cityName);
  weeklyForecast.innerHTML = '';
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
}


// FORMATS AND DISPLAYS 5 DAY FORECAST DATA ON HTML PAGE
function do5DayForecastWork(data) {
  // 5 DAY FORECAST ARRAYS
    dateArray = [];
    temperatureArray = [];
    humidityArray = [];
  for (i = 1; i < 6; i++) {
    dateArray.push(moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
    temperatureArray.push(temperatureConversion(data.daily[i].temp.day));
    humidityArray.push(data.daily[i].humidity);
  }
  show5DayForecast();
}

function show5DayForecast() {
  for (i = 0; i < 5; i++) {
    weeklyForecast.innerHTML += `
    <div class="col-sm-2">
    <div class="card blueBackground">
    <div class="card-body">
        <h5 class="card-title" style="font-size: 16px">${dateArray[i]}</h5>
        <p class="card-text">Temp: ${temperatureArray[i]}</p>
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
  temperature.innerHTML = `Temperature: ${temp}`;
  humidity.innerHTML = `Humidity: ${hum}%`;
  windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
  console.log(icon);
  iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
  console.log(iconSrc);
  topIcon.innerHTML = `
    <img src="${iconSrc}" alt="">
    `
  //topIcon.innerHTML = `src="${iconSrc}"`;
  
}

//ADDS UV INDEX TO HTML
function showUVIndex(data) {
  UVData = data;
  finalUVIndex = UVData.value;
  uvIndex.innerHTML = `UV Index: ${finalUVIndex}`;
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
    weeklyForecast.innerHTML = '';
  getWeatherData(previousCityName);
}

// Clears content in text input after "search" button clicked
function clearText() {
    searchBox.value = '';
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
//==========================================================================================


// The UV index will be colorcoded
// Add the "Degrees in fahrenheit" to ALL temperatures
// Descriptive icons will be added
