
String.prototype.removeCharAt = function (i) {
    var dateTime = this.split(''); // convert to an array
    dateTime.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return dateTime.join(''); // reconstruct the string
}




var temperatureConversion = function (temp) {
    temp = (temp - 273.15) * 1.8000 + 32;
    temp = temp.toFixed(0);
    //console.log(temp);
    return temp;
}
