var searchBox = document.getElementById('searchBox');
var searchBtn = document.getElementById('searchBtn');
var cityNM = document.getElementById('cityName');
var date = document.getElementById('date');
var pastCities = document.getElementById('pastCities');
var temperature = document.getElementById('temp');
var windSpeed = document.getElementById('windSpeed');
var pastCities = document.getElementById('pastCities');
var listItem = document.getElementById('listItem');




// I will add that variable to a template literal that has the API call URL => This will then be stored in a variable
// I will then pass the full API string variable to fetch 
// I will do a .then function that passes "response" as a parameter

function showDate() {
    currentDate = moment().format('dddd MMMM Do YYYY');
    date.innerHTML = currentDate;            
}
showDate();

let cityName = "";


function getCityName() {
    cityName = searchBox.value;
    getWeatherData(cityName);
    showSearchedFor(cityName);
}


var getWeatherData = function(cityName) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=3eddf3b54ddbebd3f11283b1ab983c30';

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    formatWeatherData(data, cityName);
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};


function formatWeatherData(data) {
    weatherData = data;
    city = weatherData.name;
    temp = weatherData.main.temp;
    hum = weatherData.main.humidity;
    ws = weatherData.wind.speed;
    description = weatherData.weather[0].description;
    icon = weatherData.weather[0].icon;
    showWeatherData(city, temp, hum, ws, description, icon);
}


function showWeatherData (city, temp, hum, ws, description, icon) {
    cityNM.innerHTML = city;
    temperature.innerHTML = `Temperature: ${temp}`;
    humidity.innerHTML = `Humidity: ${hum}%`;
    windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
}

var searchedFor = [];


function showSearchedFor () {
    cityNM.classList.remove('hidden');
    pastCities.classList.remove('hidden');
    searchedFor.push(cityName);
    searchedFor.forEach(addNewCity)
}

index = 0;

function addNewCity() {
    if (searchedFor[index] !== undefined) {
        newListItem = document.createElement('button');
        newListItem.classList.add('btn');
        newListItem.classList.add('customBtn');
        pastCities.append(newListItem);
        newListItem.innerHTML = `${searchedFor[index]}`
        index = index+1;
        // store search history in localStorage so that if a button is clicked in Search History, the data shows on HTML page
    }
}


searchBtn.addEventListener('click', getCityName);





// The city name and attributes will populate in the top right column
// The 5 day forecast will populate in the small cards

