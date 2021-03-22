// API CALLS
//==========================================================================================

//MAKES API CALL TO GET WEATHER DATA
var getWeatherData = function (cityName) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName +"&appid=3eddf3b54ddbebd3f11283b1ab983c30";
  
    fetch(apiURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            formatWeatherData(data, cityName); //stores data into variables
            formatUVindex(data, cityName); // stores data into variables
          });
        } else {
          alert("Error" + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to Weather API");
      });
  };
  



  // MAKE API CALL TO GET 5 DAY FORECAST - WILL NEED LATITUDE AND LONGITUDE
  var get5DayForecast = function (lat, lon) {
    latitude = lat;
    longitude = lon;
    var weekForecastAPI ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&exclude=minutely,hourly&appid=3eddf3b54ddbebd3f11283b1ab983c30";
  
    fetch(weekForecastAPI)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            do5DayForecastWork(data);
          });
        } else {
          alert("Error" + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to Weather API");
      });
  };
  



  //MAKES API CALL TO GET UV INDEX
  var getUVIndex = function (lat, lon) {
    latitude = lat;
    longitude = lon;
    var indexAPIurl ="https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid=3eddf3b54ddbebd3f11283b1ab983c30";
  
    fetch(indexAPIurl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            showUVIndex(data);
          });
        } else {
          alert("Error" + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to UV Index API");
      });
  };
  
  //==========================================================================================
  