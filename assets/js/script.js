var searchBox = document.getElementById('searchBox');
var searchBtn = document.getElementById('searchBtn');
var cityNM = document.getElementById('cityName');
var date = document.getElementById('date');
var pastCities = document.getElementById('pastCities');
var temperature = document.getElementById('temp');
var windSpeed = document.getElementById('windSpeed');
var pastCities = document.getElementById('pastCities');
var listItem = document.getElementById('listItem');
var uvIndex = document.getElementById('uvIndex');



function showDate() {
    currentDate = moment().format('dddd MMMM Do YYYY');
    date.innerHTML = `(${currentDate})`;  
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
                    formatWeatherData(data, cityName);          //stores data into variables
                    formatUVindex(data, cityName);              // stores data into variables
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};

var getUVIndex = function(lat, lon) {
    latitude = lat;                         //THIS WORKS!
    longitude = lon;                        // THIS WORKS
    var indexAPIurl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + '&appid=3eddf3b54ddbebd3f11283b1ab983c30';

    fetch(indexAPIurl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    showUVIndex(data);
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to UV Index API');
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

function formatUVindex(data) {
    lat = weatherData.coord.lat;                    //THIS WORKS!
    lon = weatherData.coord.lon;                    // THIS WORKS!
    getUVIndex(lat, lon);                           // passes lat and lon to function that makes API call for UV Index
}

function showWeatherData (city, temp, hum, ws, description, icon) {
    cityNM.innerHTML = city;
    temperature.innerHTML = `Temperature: ${temp}`;
    humidity.innerHTML = `Humidity: ${hum}%`;
    windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
}


function showUVIndex(data) {
    console.log("I GOT THE UV INDEX DATA!");
    UVData = data;
    finalUVIndex = UVData.value;
    //ADD THE UV INDEX TO THE HTML PAGE HERE
    uvIndex.innerHTML = `UV Index: ${finalUVIndex}`;

}


var searchedFor = [];

function showSearchedFor () {
    cityNM.classList.remove('hidden');
    pastCities.classList.remove('hidden');
    searchedFor.push(cityName);
    searchedFor.forEach(addCitytoSearchHistory)
}

index = 0;

function addCitytoSearchHistory() {
    if (searchedFor[index] !== undefined) {
        newListItem = document.createElement('button');
        newListItem.setAttribute("id", index);
        newListItem.classList.add('btn');
        newListItem.classList.add('customBtn');
        pastCities.append(newListItem);
        newListItem.innerHTML = `${searchedFor[index]}`
        index = index+1;
    }
}

$(pastCities).click(function(e) {
    previousCity = e.target.id;
    previousCityName = searchedFor[previousCity];
    showHistory(previousCityName);
})

function showHistory() {
    getWeatherData(previousCityName);
}


searchBtn.addEventListener('click', getCityName);





// The city name and attributes will populate in the top right column
// The 5 day forecast will populate in the small cards

