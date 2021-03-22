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
                    get5DayForecast(cityName);
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather API');
        });
};


// MAKE API CALL TO GET 5 DAY FORECAST
var get5DayForecast = function(cityname) {
    //console.log(cityName);//                    //THIS WORKS!
    var weekForecastAPIurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=3eddf3b54ddbebd3f11283b1ab983c30";

    fetch(weekForecastAPIurl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    format5dayForecast(data);
                });
            } else {
                alert('Error' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to 5 Day Forecast API');
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

//STORES DATA INTO VARIABLES AND PASSES IT TO FUNCTION THAT MAKES API CALL
function formatUVindex(data) {
    lat = weatherData.coord.lat;                  
    lon = weatherData.coord.lon;                   
    getUVIndex(lat, lon);                         
}

today = moment().format('YYYY-MM-DD');
day1Date = moment().add(1, 'days').format('YYYY-MM-DD');       
day2Date = moment().add(2, 'days').format('YYYY-MM-DD'); 
day3Date = moment().add(3, 'days').format('YYYY-MM-DD');
day4Date = moment().add(4, 'days').format('YYYY-MM-DD');
day5Date = moment().add(4, 'days').format('YYYY-MM-DD');
//day1Date == formattedDate.trim()                  ==> true!!!!!!!!!!!

function format5dayForecast(data) {
    for (i=0; i < data.list.length; i++) {
        unformattedDate = data.list[i].dt_txt
        formatAPIDate(unformattedDate);
    }    
} 


function do5DayForecastWork(formattedDate) {
    //console.log(formattedDate);
    if (formattedDate === day1Date) {
        console.log('WE HAVE A MATCH!')                     //THIS WORKS!!!!!!!!!!!!
        //The API date is formatted and matches my day1Date variable value; HOWEVER, since it has 3 hour updates, I get MULTIPLE returns from the API data for each day
        //Add logic that pulls the temperature based on the date for a SPECIFIC TIME INTERVAL (IE: 03:00:00)
        //I have notes in the 'notes' file that may help with this step!
    }
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



