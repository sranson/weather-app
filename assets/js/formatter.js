
var temperatureConversion = function (temp) {
    temp = (temp - 273.15) * 1.8000 + 32;
    temp = temp.toFixed(1);
    return temp;
}
