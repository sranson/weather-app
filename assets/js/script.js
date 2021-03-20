var searchBox = document.getElementById('searchBox');
var searchBtn = document.getElementById('searchBtn');



// I will add that variable to a template literal that has the API call URL => This will then be stored in a variable
// I will then pass the full API string variable to fetch 
// I will do a .then function that passes "response" as a parameter


let cityName = "";


function getCityName() {
    cityName = searchBox.value;
    getWeatherData(cityName);
}


var getWeatherData = function(cityName) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=3eddf3b54ddbebd3f11283b1ab983c30';

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    displayWeatherData(data, cityName);
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};


function displayWeatherData(data) {
    weatherData = data;
    city = weatherData.name;
    temp = weatherData.main.temp;
    humidity = weatherData.main.humidity;
    windSpeed = weatherData.wind.speed;
    description = weatherData.weather[0].description;
    icon = weatherData.weather[0].icon;
}

searchBtn.addEventListener('click', getCityName);



// The city name and attributes will populate in the top right column
// The 5 day forecast will populate in the small cards

