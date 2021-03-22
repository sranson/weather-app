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



// VARIABLES
//==========================================================================================
let cityName = "";
var searchedFor = [];
index = 0;
//==========================================================================================






// API CALLS
//==========================================================================================

//MAKES API CALL TO GET WEATHER DATA
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

// MAKE API CALL TO GET 5 DAY FORECAST - WILL NEED LATITUDE AND LONGITUDE
var get5DayForecast = function(lat, lon) {
    latitude = lat; 
    longitude = lon;
    var weekForecastAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&appid=3eddf3b54ddbebd3f11283b1ab983c30';

    fetch(weekForecastAPI)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                do5DayForecastWork(data);
            });
        } else {
            alert('Error' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Weather API');
    });
};
    

//MAKES API CALL TO GET UV INDEX
var getUVIndex = function(lat, lon) {
    latitude = lat;                         
    longitude = lon;                     
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

//==========================================================================================





//FUNCTIONS
//==========================================================================================

//SHOWS CURRENT DATE
function showDate() {
    currentDate = moment().format('dddd MMMM Do YYYY');
    date.innerHTML = `(${currentDate})`;  
}
showDate();


// GETS THE CITY NAME FROM USER ON HTML PAGE
function getCityName() {
    cityName = searchBox.value;
    getWeatherData(cityName);
    showSearchedFor(cityName);
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


function do5DayForecastWork(data) {
    today = data.current.dt                                                                        
    //d1Temp = data.daily[1].temp.day;  
    D1Temp = temperatureConversion(data.daily[1].temp.day);
    D2Temp = temperatureConversion(data.daily[2].temp.day);
    D3Temp = temperatureConversion(data.daily[3].temp.day);
    D4Temp = temperatureConversion(data.daily[4].temp.day);
    D5Temp = temperatureConversion(data.daily[5].temp.day);
    console.log(D1Temp); 
    console.log(D2Temp); 
    console.log(D3Temp); 
    console.log(D4Temp); 
    console.log(D5Temp);                                                                                                                                                                               
}





//STORES DATA INTO VARIABLES AND PASSES IT TO FUNCTION THAT MAKES API CALL
function formatUVindex(data) {
    lat = weatherData.coord.lat;                  
    lon = weatherData.coord.lon;                   
    getUVIndex(lat, lon);    
    get5DayForecast(lat, lon);                     
}


//ADDS DATA TO HTML
function showWeatherData (city, temp, hum, ws, description, icon) {
    cityNM.innerHTML = city;
    temperature.innerHTML = `Temperature: ${temp}`;
    humidity.innerHTML = `Humidity: ${hum}%`;
    windSpeed.innerHTML = `Wind Speed: ${ws} MPH`;
}

//ADDS UV INDEX TO HTML
function showUVIndex(data) {
    UVData = data;
    finalUVIndex = UVData.value;
    uvIndex.innerHTML = `UV Index: ${finalUVIndex}`;

}

// REMOVES HIDDEN CLASS AND ADDS SEARCH HISTORY CITIES TO AN ARRAY
function showSearchedFor () {
    cityNM.classList.remove('hidden');
    pastCities.classList.remove('hidden');
    searchedFor.push(cityName);
    searchedFor.forEach(addCitytoSearchHistory)
}

// ADDS SEARCH HISTORY CITIES FROM ARRAY TO HTML
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

// MAKES API CALL FOR CITIES IN THE SEARCH HISTORY
function showHistory() {
    getWeatherData(previousCityName);
}

//==========================================================================================





// EVENT LISTENERS
//==========================================================================================
$(pastCities).click(function(e) {
    previousCity = e.target.id;
    previousCityName = searchedFor[previousCity];
    showHistory(previousCityName);
})


searchBtn.addEventListener('click', getCityName);
//==========================================================================================





// The 5 day forecast will populate in the small cards
// The UV index will be colorcoded
// The temperature will be converted from Kelvin to Fahrenheit
// Descriptive icons will be added



